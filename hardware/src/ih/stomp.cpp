#include "stomp.hpp"

ih::stomp_client::stomp_client() : state_(ih::stomp_state::waiting) {
}

ih::stomp_client::~stomp_client() {
  if (this->state_ != ih::stomp_state::waiting) {
    this->close_connection();
  }
}

void ih::stomp_client::begin(const std::string hostname, const int port, const std::string path) {
  this->ws_client_.onEvent([this](WStype_t type, uint8_t* payload, size_t length) {
    this->handle_websocket_event_(type, payload, length);
  });

  this->ws_client_.begin(hostname.c_str(), port, path.c_str());
  this->ws_client_.setExtraHeaders();

  this->state_ = ih::stomp_state::connecting;
}

void ih::stomp_client::loop() {
  this->ws_client_.loop();
}

void ih::stomp_client::end() {
  switch (this->state_) {
    case ih::stomp_state::connected:
      this->send_end_frame_();
      break;

    case ih::stomp_state::connecting:
    case ih::stomp_state::disconnected:
      this->close_connection();
    
    case ih::stomp_state::waiting:
      break;
  }
}

void ih::stomp_client::close_connection() {
  this->state_ = ih::stomp_state::waiting;
  this->should_trigger_disconnect_handler_ = true;
  this->ws_client_.disconnect();
  this->ws_client_ = {};
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

void ih::stomp_client::on_disconnect(ih::stomp_disconnect_handler handler) {
  this->disconnect_handler_ = handler;
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

void ih::stomp_client::handle_websocket_event_(WStype_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case WStype_t::WStype_DISCONNECTED:
      this->handle_disconnect_();
      break;

    case WStype_t::WStype_CONNECTED:
      this->should_trigger_disconnect_handler_ = true;
      this->send_connect_frame_();
      break;

    case WStype_TEXT:
      ih::stomp_message message;
      this->parse_message_(std::string{ reinterpret_cast<char*>(payload) }, message);
      
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

void ih::stomp_client::handle_disconnect_() {
  if (this->state_ != ih::stomp_state::waiting) {
    this->state_ = ih::stomp_state::disconnected;
  }

  if (this->should_trigger_disconnect_handler_ && this->disconnect_handler_) {
    this->should_trigger_disconnect_handler_ = false;
    this->disconnect_handler_();
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
      this->close_connection();
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
  std::ostringstream ss;

  ss << "CONNECT\n";
  ss << "accept-version:1.1,1.0\n";
  ss << "heart-beat:0,10000\n\n";

  this->send_sstream_(ss);
}

void ih::stomp_client::send_end_frame_() {
  std::ostringstream ss;

  ss << "DISCONNECT\n";
  ss << "receipt:disconnect\n\n";

  this->send_sstream_(ss);
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
  this->ws_client_.sendTXT(txt.c_str(), txt.length() + 1);
}
