#include "home.hpp"

std::string get_path_with_id(std::string base, std::string& id);

ih::home_manager::home_manager(ih::stomp_client& stomper): stomper_(stomper) {
}

void ih::home_manager::register_device(ih::device& device) {
  this->devices_.push_back(device);
  this->send_add_device_message_if_connected_(device);
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

void ih::home_manager::connect_callback(const ih::stomp_message&) {
  this->stomper_.subscribe("/user/queue/device/feature/request-update", [this](const ih::stomp_message& message) {
    this->handle_feature_update_request_message_(message);
  });

  for (auto& device : this->devices_) {
    this->send_add_device_message_if_connected_(device);
  }

  for (auto& feature : this->features_) {
    this->send_add_feature_message_if_connected_(feature);
  }
}

void ih::home_manager::send_add_device_message_if_connected_(const ih::device& device) {
  if (this->stomper_.get_state() == ih::stomp_state::connected) {
    this->stomper_.send("/app/device/register", device.to_json());
  }
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
