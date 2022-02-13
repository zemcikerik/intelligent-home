#pragma once
#include "device.hpp"
#include "feature.hpp"
#include "stomp.hpp"
#include "web_interface.hpp"
#include "wifi_scanner.hpp"

namespace ih {

using feature_update_request_handler = std::function<void (feature&, JsonObject&)>;

struct feature_update_request_handler_entry {
  feature& target_feature;
  feature_update_request_handler handler;
};

struct home_server_info {
  std::string hostname;
  std::uint16_t port;
  std::string ws_path;
};

enum class home_state {
  waiting_for_network,
  waiting_for_server_info,
  connecting,
  auth,
  ready
};

struct web_server_configuration {
  std::uint16_t port = 80;
  bool enable_wifi_api = true;
  bool enable_connect_api = true;
  bool enable_control_interface = true;
  std::shared_ptr<wifi_scanner> wifi_scanner_ptr;
};

class home_manager {
public:
  void begin();
  void set_device_info(device device);
  void set_server_info(std::shared_ptr<home_server_info> server_info);
  home_state get_state() const;

  void register_feature(feature& feature);
  void update_feature(feature& feature);
  void on_feature_update_request(feature& feature, feature_update_request_handler handler);

  void enable_web_server(web_server_configuration config = {});

private:
  stomp_client stomper_;
  std::shared_ptr<web_interface> web_interface_;
  std::shared_ptr<wifi_scanner> wifi_scanner_;

  device device_info_;
  home_state state_;
  std::vector<std::reference_wrapper<feature>> features_;
  std::vector<feature_update_request_handler_entry> update_handler_entries_;

  std::shared_ptr<home_server_info> server_info_;

  void wifi_connect_callback_();
  void wifi_disconnect_callback_();
  void server_connect_callback_();
  void server_disconnect_callback_();

  void initialize_connection_to_server_();

  void send_add_feature_message_if_connected_(const feature& feature);
  void handle_feature_update_request_message_(const ih::stomp_message& message);
};

}
