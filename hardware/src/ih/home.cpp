#include "home.hpp"
#include <SPIFFS.h>
#include "wifi_json_helper.hpp"

std::string get_path_with_id(std::string base, std::string& id);

void ih::home_manager::begin() {
  this->stomper_.on_connect([this](const ih::stomp_message&) {
    this->server_connect_callback_();
  });

  this->stomper_.on_disconnect([this]() {
    this->server_disconnect_callback_();
  });

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

  if (SPIFFS.exists("/server.json")) {
    this->load_server_info_();
  }

  if (WiFi.isConnected()) {
    this->wifi_connect_callback_();

    // if there was no attempt to connect yet, default status should be WL_NO_SHIELD
  } else if (WiFi.status() == wl_status_t::WL_NO_SHIELD && SPIFFS.exists("/wifi.json")) {
    this->load_wifi_info_();
  }
}

void ih::home_manager::loop() {
  this->stomper_.loop();
}

void ih::home_manager::set_device_info(ih::device device) {
  this->device_info_ = device;
}

bool ih::home_manager::set_server_info(const ih::home_server_info& server_info) {
  if (this->state_ == ih::home_state::waiting_for_network || this->state_ == ih::home_state::waiting_for_server_info) {
    this->server_info_ = server_info;

    if (this->state_ == ih::home_state::waiting_for_server_info) {
      this->initialize_connection_to_server_();
    }

    return true;
  }

  return false;
}

bool ih::home_manager::disconnect_from_server() {
  if (this->state_ == ih::home_state::waiting_for_network && this->server_info_.hostname != "") {
    this->state_ = {};
    return true;
  }

  if (this->state_ == ih::home_state::waiting_for_server_info) {
    return false;
  }

  this->server_info_ = {};
  this->stomper_.end();
  return true;
}

ih::home_state ih::home_manager::get_state() const {
  return this->state_;
}

void ih::home_manager::register_feature(ih::feature& feature) {
  this->features_.push_back(feature);
  this->send_add_feature_message_if_connected_(feature);
}

void ih::home_manager::update_feature(ih::feature& feature) {
  if (feature.state != nullptr && this->state_ == ih::home_state::ready) {
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

  if (config.enable_home_server_api) {
    this->web_interface_->enable_home_status_endpoints({
      .get_home_status = [this]() {
        return this->get_status_for_web_();
      },
      .set_home_server_info = [this](ih::home_server_info& server_info) {
        return this->set_server_info(server_info);
      },
      .disconnect_home_server = [this]() {
        return this->disconnect_from_server();
      }
    });
  }

  if (config.enable_control_interface) {
    this->web_interface_->serve_static(SPIFFS, "/web/");
  }
}

void ih::home_manager::wifi_connect_callback_() {
  if (this->server_info_.hostname != "") {
    this->initialize_connection_to_server_();
  } else {
    this->state_ = ih::home_state::waiting_for_server_info;
  }

  this->persist_wifi_info_();
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

  this->persist_server_info_();
}

void ih::home_manager::server_disconnect_callback_() {
  this->state_ = this->stomper_.get_state() == ih::stomp_state::disconnected
    ? ih::home_state::connecting
    : ih::home_state::waiting_for_server_info;
}

void ih::home_manager::initialize_connection_to_server_() {
  const auto& server = this->server_info_;
  this->stomper_.begin(server.hostname, server.port, server.ws_path);
  this->state_ = ih::home_state::connecting;
}

void ih::home_manager::persist_server_info_() {
  File file = SPIFFS.open("/server.json", "w");
  this->server_info_.to_json(file);
  file.close();
}

void ih::home_manager::persist_wifi_info_() {
  File file = SPIFFS.open("/wifi.json", "w");
  ih::wifi_json_helper::current_wifi_to_json(file);
  file.close();
}

void ih::home_manager::load_server_info_() {
  File file = SPIFFS.open("/server.json", "r");
  this->server_info_ = ih::home_server_info::from_json(file);
  file.close();
}

void ih::home_manager::load_wifi_info_() {
  File file = SPIFFS.open("/wifi.json", "r");
  ih::wifi_json_helper::wifi_begin_from_json(file);
  file.close();
}

void ih::home_manager::send_add_feature_message_if_connected_(const ih::feature& feature) {
  if (this->state_ == ih::home_state::ready) {
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

ih::web_home_status ih::home_manager::get_status_for_web_() const {
  return {
    .state = this->state_,
    .server_info = this->server_info_
  };
}

std::string get_path_with_id(std::string base, std::string& id) {
  std::ostringstream ss;
  ss << base;
  ss << id;
  return ss.str();
}
