#include "stomp.hpp"
#include <Arduino.h>

ih::stomp_client::stomp_client() : state_(ih::stomp_state::waiting) {
}

ih::stomp_client::~stomp_client() {
  if (this->state_ != ih::stomp_state::waiting) {
    this->close_connection_();
  }
}

void ih::stomp_client::begin(const std::string hostname, const int port, const std::string path) {
  esp_websocket_client_config_t config{};
  config.host = hostname.c_str();
  config.port = port;
  config.path = path.c_str();

  const auto event_handler = [](void* stomper_ptr, esp_event_base_t event_base, int32_t event_id, void* event_data) {
    const auto client = reinterpret_cast<ih::stomp_client*>(stomper_ptr);
    const auto ws_event_data = reinterpret_cast<esp_websocket_event_data_t*>(event_data);
    client->handle_websocket_event_(event_base, static_cast<esp_websocket_event_id_t>(event_id), ws_event_data);
  };

  this->client_handle_ = esp_websocket_client_init(&config);
  esp_websocket_register_events(this->client_handle_, WEBSOCKET_EVENT_ANY, event_handler, this);
  esp_websocket_client_start(this->client_handle_);

  this->state_ = ih::stomp_state::connecting;
}

void ih::stomp_client::end() {
  switch (this->state_) {
    case ih::stomp_state::connected:
      this->send_end_frame_();
      break;

    case ih::stomp_state::connecting:
    case ih::stomp_state::disconnected:
      this->close_connection_();
    
    case ih::stomp_state::waiting:
      break;
  }
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
      this->state_ = ih::stomp_state::disconnected;
      Serial.println("WS Disconnect!");
      break;

    case esp_websocket_event_id_t::WEBSOCKET_EVENT_CONNECTED:
      this->send_connect_frame_();
      Serial.println("WS Connect!");
      break;

    case esp_websocket_event_id_t::WEBSOCKET_EVENT_DATA:
      // TODO: currently ignoring other options!
      ih::stomp_message message;
      this->parse_message_(data->data_ptr, message);
      
      if (message.command == "CONNECTED") {
        this->handle_connect_(message);
      } else if (message.command == "MESSAGE") {
        this->handle_message_(message);
      } else if (message.command == "ERROR") {
        this->handle_error_(message);
      } else if (message.command == "RECEIPT") {
        this->handle_recepit_(message);
      } else {
        this->handle_unknown_(message);
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

void ih::stomp_client::handle_error_(const ih::stomp_message& message) {
  if (this->error_handler_) {
    this->error_handler_(message);
  }
}

void ih::stomp_client::handle_recepit_(const ih::stomp_message& message) {
  for (auto& header : message.headers) {
    if (header.first == "receipt-id" && header.second == "disconnect") {
      this->close_connection_();
      return;
    }
  }

  this->handle_unknown_(message);
}

void ih::stomp_client::handle_unknown_(const ih::stomp_message& message) {
  if (this->unknown_handler_) {
    this->unknown_handler_(message);
  }
}

void ih::stomp_client::send_connect_frame_() {
  Serial.println("sending connect frame!");
  std::ostringstream ss;

  ss << "CONNECT\n";
  ss << "accept-version:1.1,1.0\n";
  ss << "heart-beat:0,10000\n\n";

  this->send_sstream_(ss);
}

void ih::stomp_client::send_end_frame_() {
  Serial.println("Sending DISCONNECT frame!");
  std::ostringstream ss;

  ss << "DISCONNECT\n";
  ss << "receipt:disconnect\n\n";

  this->send_sstream_(ss);
}

void ih::stomp_client::close_connection_() {
  Serial.println("Closing connection!");

  const auto close_connection = [](void* param) {
    const auto handle = reinterpret_cast<esp_websocket_client_handle_t>(param);
    // TODO: esp_websocket_client_close(handle);
    esp_websocket_client_stop(handle);
    esp_websocket_client_destroy(handle);
    vTaskDelete(nullptr);
  };

  const auto handle = this->client_handle_;
  this->client_handle_ = nullptr;
  this->state_ = ih::stomp_state::waiting;

  // we need to create a new task for this as shutting down websocket is not allowed inside websocket event handler
  xTaskCreate(close_connection, "Stomp Client Shutdown", 1024, handle, 2, nullptr);
}

void ih::stomp_client::parse_message_(const std::string& data, ih::stomp_message& out_message) {
  const std::size_t command_end = data.find_first_of('\n');
  out_message.command = data.substr(0, command_end);

  if (out_message.command.back() == '\r') {
    out_message.command.pop_back();
  }

  std::size_t header_start = command_end + 1;
  std::size_t header_end;
  bool check_next_header = true;

  while (check_next_header) {
    header_end = data.find_first_of('\n', header_start);
    const char next_char = data.at(header_end + 1);

    if (next_char == '\n' || next_char == '\r') {
      check_next_header = false;
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

void ih::stomp_client::send_sstream_(std::ostringstream& ss) {
  const std::string txt = ss.str();
  Serial.println(txt.c_str());
  esp_websocket_client_send_text(this->client_handle_, txt.c_str(), txt.length() + 1, 5000 / portTICK_RATE_MS); // TODO: adjust timeout value properly
}
