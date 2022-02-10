#include "stomp.hpp"

void handle_websocket_event_helper(void* stomper_ptr, esp_event_base_t event_base, int32_t event_id, void* event_data) {
  auto client = reinterpret_cast<ih::stomp_client*>(stomper_ptr);
  auto ws_event_data = reinterpret_cast<esp_websocket_event_data_t*>(event_data);
  client->handle_websocket_event_(event_base, static_cast<esp_websocket_event_id_t>(event_id), ws_event_data);
}

ih::stomp_client::stomp_client() : state_(ih::stomp_state::waiting) {
}

void ih::stomp_client::begin(const std::string hostname, const int port, const std::string path) {
  esp_websocket_client_config_t config{};
  config.host = hostname.c_str();
  config.port = port;
  config.path = path.c_str();

  this->client_handle_ = esp_websocket_client_init(&config);
  esp_websocket_register_events(this->client_handle_, WEBSOCKET_EVENT_ANY, handle_websocket_event_helper, this);
  esp_websocket_client_start(this->client_handle_);

  this->state_ = ih::stomp_state::connecting;
}

void ih::stomp_client::send(const std::string destination, const std::string body) {
  std::ostringstream ss;

  ss << "SEND\n";
  ss << "destination:" << destination << "\n\n";
  ss << body;

  this->send_sstream_(ss);
}

void ih::stomp_client::subscribe(const std::string destination, ih::stomp_handler handler) {
  stomp_subscription subscription{ this->next_subscription_token_, handler };

  std::ostringstream ss;
  ss << "SUBSCRIBE\n";
  ss << "id:" << subscription.token << "\n";
  ss << "destination:" << destination << "\n\n";

  this->send_sstream_(ss);

  this->subscriptions_.push_back(subscription);
  this->next_subscription_token_++;
}

void ih::stomp_client::unsubscribe(const ih::stomp_subscription_token subscription_token) {
  for (ih::stomp_subscription_token i = 0; i < this->subscriptions_.size(); i++) {
    const auto& subscription = this->subscriptions_[i];

    if (subscription.token != subscription_token) {
      continue;
    }

    std::ostringstream ss;
    ss << "UNSUBSCRIBE\n";
    ss << "id:" << subscription_token << "\n\n";

    this->send_sstream_(ss);
    this->subscriptions_.erase(this->subscriptions_.begin() + i);
    break;
  }
}

void ih::stomp_client::on_connect(ih::stomp_handler handler) {
  this->connect_handler_ = handler;
}

void ih::stomp_client::on_error(ih::stomp_handler handler) {
  this->error_handler_ = handler;
}

void ih::stomp_client::on_unknown(ih::stomp_handler handler) {
  this->unknown_handler_ = handler;
}

ih::stomp_state ih::stomp_client::get_state() const {
  return this->state_;
}

void ih::stomp_client::handle_websocket_event_(esp_event_base_t base, esp_websocket_event_id_t id, esp_websocket_event_data_t* data) {
  switch (id) {
    case esp_websocket_event_id_t::WEBSOCKET_EVENT_DISCONNECTED:
      // TODO: handle disconnect
      this->state_ = ih::stomp_state::disconnected;
      break;

    case esp_websocket_event_id_t::WEBSOCKET_EVENT_CONNECTED:
      this->connect_();
      break;

    case esp_websocket_event_id_t::WEBSOCKET_EVENT_DATA:
      // TODO: currently ignoring byte data
      ih::stomp_message message;
      this->parse_message_(data->data_ptr, message);
      
      if (message.command == "CONNECTED") {
        this->handle_connect_(message);
      } else if (message.command == "MESSAGE") {
        this->handle_message_(message);
      } else if (message.command == "ERROR") {
        if (this->error_handler_) {
          this->error_handler_(message);
        }
      } else {
        if (this->unknown_handler_) {
          this->unknown_handler_(message);
        }
      }

      break;
  }
}

void ih::stomp_client::handle_connect_(const ih::stomp_message& message) {
  this->subscriptions_.clear();
  this->state_ = ih::stomp_state::connected;
  
  if (this->connect_handler_) {
    this->connect_handler_(message);
  }
}

void ih::stomp_client::handle_message_(const ih::stomp_message& message) {
  const ih::stomp_header* subscription_header = nullptr;

  for (const auto& header : message.headers) {
    if (header.first == "subscription") {
      subscription_header = &header;
      break;
    }
  }

  if (subscription_header == nullptr) {
    return;
  }

  const ih::stomp_subscription_token token = std::atoi(subscription_header->second.c_str());
  const ih::stomp_subscription* subscription = nullptr;

  for (const auto& sub : this->subscriptions_) {
    if (sub.token == token) {
      subscription = &sub;
      break;
    }
  }

  if (subscription == nullptr) {
    return;
  }

  subscription->handler(message);
}

void ih::stomp_client::parse_message_(const std::string& data, ih::stomp_message& out_message) {
  const std::size_t command_end = data.find_first_of('\n');
  out_message.command = data.substr(0, command_end);

  if (out_message.command.back() == '\r') {
    out_message.command.pop_back();
  }

  std::size_t header_start = command_end + 1;
  std::size_t header_end;

  while (true) {
    header_end = data.find_first_of('\n', header_start);
    const char next_char = data.at(header_end + 1);

    if (next_char == '\n' || next_char == '\r') {
      break;
    }

    const std::size_t separator = data.find_first_of(':', header_start);
    const std::string key = data.substr(header_start, separator - header_start);
    std::string value = data.substr(separator + 1, header_end - separator - 1);

    if (value.back() == '\r') {
      value.pop_back();
    }

    out_message.headers.push_back(std::make_pair(key, value));
    header_start = header_end + 1;
  }

  if (data.size() > header_end + 2) {
    out_message.body = data.substr(header_end + 2);
  }
}

void ih::stomp_client::connect_() {
  std::ostringstream ss;

  ss << "CONNECT\n";
  ss << "accept-version:1.1,1.0\n";
  ss << "heart-beat:0,10000\n\n";

  this->send_sstream_(ss);
}

void ih::stomp_client::send_sstream_(std::ostringstream& ss) {
  const std::string txt = ss.str();
  esp_websocket_client_send_text(this->client_handle_, txt.c_str(), txt.length() + 1, 5000 / portTICK_RATE_MS); // TODO: adjust timeout value properly
}
