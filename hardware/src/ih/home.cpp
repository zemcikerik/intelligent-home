#include "home.hpp"

std::string get_path_with_id(std::string base, std::string& id);

void ih::home_manager::begin() {
  this->stomper_.on_connect([this](const ih::stomp_message&) {
    this->server_connect_callback_();
  });

  this->stomper_.on_disconnect([this]() {
    this->server_disconnect_callback_();
  });

  // TODO: proper handling
  this->stomper_.on_unknown([](const ih::stomp_message& message) {
    Serial.print("Unknown command: ");
    Serial.println(message.command.c_str());
  });

  WiFi.onEvent([this](system_event_id_t, system_event_info_t) {
    this->wifi_connect_callback_();
  }, system_event_id_t::SYSTEM_EVENT_STA_CONNECTED);

  WiFi.onEvent([this](system_event_id_t, system_event_info_t) {
    this->wifi_disconnect_callback_();
  }, system_event_id_t::SYSTEM_EVENT_STA_DISCONNECTED);

  if (this->web_interface_) {
    this->web_interface_->begin();
  }

  if (WiFi.isConnected()) {
    if (this->server_info_) {
      this->initialize_connection_to_server_();
    } else {
      this->state_ = ih::home_state::waiting_for_server_info;
    }
  }
}

void ih::home_manager::set_device_info(ih::device device) {
  this->device_info_ = device;
}

void ih::home_manager::set_server_info(std::shared_ptr<ih::home_server_info> server_info) {
  this->server_info_ = std::move(server_info);

  // TODO: should we handle change if already connected to server?
  if (this->state_ == ih::home_state::waiting_for_server_info) {
    this->initialize_connection_to_server_();
  }
}

ih::home_state ih::home_manager::get_state() const {
  return this->state_;
}

void ih::home_manager::register_feature(ih::feature& feature) {
  this->features_.push_back(feature);
  this->send_add_feature_message_if_connected_(feature);
}

void ih::home_manager::update_feature(ih::feature& feature) {
  if (feature.state != nullptr && this->stomper_.get_state() == ih::stomp_state::connected) {
    std::string path = get_path_with_id("/app/device/feature/update/", feature.id);
    this->stomper_.send(path, feature.state->to_json());
  }
}

void ih::home_manager::on_feature_update_request(ih::feature& feature, feature_update_request_handler handler) {
  this->update_handler_entries_.push_back({ feature, handler });
}

void ih::home_manager::enable_web_server(ih::web_server_configuration config) {
  this->web_interface_ = std::make_shared<web_interface>(config.port);

  if (config.enable_wifi_api) {
    this->wifi_scanner_ = config.wifi_scanner_ptr ? config.wifi_scanner_ptr : std::make_shared<wifi_scanner>();
    this->web_interface_->enable_wifi_network_endpoints(this->wifi_scanner_);
  }

  if (config.enable_connect_api) {
    this->web_interface_->enable_wifi_status_endpoints();
  }

  if (config.enable_control_interface) {
    // TODO: serve static content
  }
}

void ih::home_manager::wifi_connect_callback_() {
  if (this->server_info_) {
    this->initialize_connection_to_server_();
  } else {
    this->state_ = ih::home_state::waiting_for_server_info;
  }
}

void ih::home_manager::wifi_disconnect_callback_() {
  this->stomper_.close_connection();
  this->state_ = ih::home_state::waiting_for_network;
}

void ih::home_manager::server_connect_callback_() {
  this->state_ = ih::home_state::ready;
  this->stomper_.send("/app/device/register", this->device_info_.to_json());

  for (auto& feature : this->features_) {
    this->send_add_feature_message_if_connected_(feature);
  }

  this->stomper_.subscribe("/user/queue/device/feature/request-update", [this](const ih::stomp_message& message) {
    this->handle_feature_update_request_message_(message);
  });
}

void ih::home_manager::server_disconnect_callback_() {
  const auto stomper_state = this->stomper_.get_state();

  if (this->server_info_) {
    if (stomper_state == ih::stomp_state::disconnected) {
      this->stomper_.close_connection();
    }

    this->initialize_connection_to_server_();
    return;
  }

  this->state_ = stomper_state == ih::stomp_state::disconnected ? ih::home_state::connecting : ih::home_state::waiting_for_server_info;
}

void ih::home_manager::initialize_connection_to_server_() {
  const auto& server = *this->server_info_;
  this->stomper_.begin(server.hostname, server.port, server.ws_path);
  this->state_ = ih::home_state::connecting;
  this->server_info_ = nullptr;
}

void ih::home_manager::send_add_feature_message_if_connected_(const ih::feature& feature) {
  if (this->stomper_.get_state() == ih::stomp_state::connected) {
    this->stomper_.send("/app/device/feature/register", feature.to_json());
  }
}

void ih::home_manager::handle_feature_update_request_message_(const ih::stomp_message& message) {
  DynamicJsonDocument doc{ 512 };
  deserializeJson(doc, message.body);

  std::string feature_id = doc["featureId"];
  JsonObject update_body = doc.getMember("update");

  for (auto& entry : this->update_handler_entries_) {
    if (entry.target_feature.id == feature_id) {
      entry.handler(entry.target_feature, update_body);
    }
  }
}

std::string get_path_with_id(std::string base, std::string& id) {
  std::ostringstream ss;
  ss << base;
  ss << id;
  return ss.str();
}
