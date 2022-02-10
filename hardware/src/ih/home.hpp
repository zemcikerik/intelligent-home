#pragma once
#include "device.hpp"
#include "feature.hpp"
#include "stomp.hpp"

namespace ih {

using feature_update_request_handler = std::function<void (feature&, JsonObject&)>;

struct feature_update_request_handler_entry {
  feature& target_feature;
  feature_update_request_handler handler;
};

class home_manager {
public:
  home_manager(stomp_client& stomper);

  void register_device(device& device);
  void register_feature(feature& feature);
  void update_feature(feature& feature);

  void on_feature_update_request(feature& feature, feature_update_request_handler handler);

private:
  stomp_client& stomper_;
  std::vector<std::reference_wrapper<device>> devices_;
  std::vector<std::reference_wrapper<feature>> features_;
  std::vector<feature_update_request_handler_entry> update_handler_entries_;

  void on_connect_();
  void send_add_device_message_if_connected_(const device& device);
  void send_add_feature_message_if_connected_(const feature& feature);
  void handle_feature_update_request_message_(const ih::stomp_message& message);
};

}
