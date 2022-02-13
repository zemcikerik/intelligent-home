#pragma once
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include <AsyncJson.h>
#include "wifi_scanner.hpp"

namespace ih {

using web_request = AsyncWebServerRequest;

class web_interface {
public:
  web_interface(std::uint16_t port);
  ~web_interface();

  void begin();
  void enable_wifi_status_endpoints();
  void enable_wifi_network_endpoints(std::shared_ptr<wifi_scanner> wifi_scanner);
  void serve_static(fs::FS& fs, std::string fs_path, bool redirect_not_found_to_root = true);

private:
  AsyncWebServer web_server_;
  bool add_default_not_found_handler_ = true;

  bool wifi_status_endpoints_ = false;
  std::shared_ptr<wifi_scanner> wifi_scanner_ = nullptr;

  void web_server_on_post_(std::string uri, ArJsonRequestHandlerFunction handler);
  void handle_get_wifi_networks_(web_request* request);
};

}
