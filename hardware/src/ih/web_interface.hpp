#pragma once
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include <AsyncJson.h>
#include "home_server_info.hpp"
#include "home_state.hpp"
#include "wifi_scanner.hpp"

namespace ih {

using web_request = AsyncWebServerRequest;

struct web_home_status {
  home_state state;
  home_server_info server_info;
};

using web_home_status_getter = std::function<web_home_status ()>;
using web_home_server_info_consumer = std::function<bool (home_server_info&)>;
using web_home_server_disconnect_handler = std::function<bool ()>;

struct web_home_status_handlers {
  web_home_status_getter get_home_status;
  web_home_server_info_consumer set_home_server_info;
  web_home_server_disconnect_handler disconnect_home_server;
};

class web_interface {
public:
  web_interface(std::uint16_t port);
  ~web_interface();

  void begin();
  void enable_wifi_status_endpoints();
  void enable_wifi_network_endpoints(std::shared_ptr<wifi_scanner> wifi_scanner);
  void enable_home_status_endpoints(const web_home_status_handlers& handlers);
  void serve_static(fs::FS& fs, std::string fs_path, bool redirect_not_found_to_root = true);

private:
  AsyncWebServer web_server_;

  bool add_default_not_found_handler_ = true;
  bool wifi_status_endpoints_ = false;
  std::shared_ptr<wifi_scanner> wifi_scanner_ = nullptr;
  web_home_status_handlers home_status_handlers_{};

  void web_server_on_post_(std::string uri, ArJsonRequestHandlerFunction handler);
  void handle_get_wifi_networks_(web_request* request);
};

}
