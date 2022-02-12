#pragma once
#include "wifi_async.hpp"
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include <AsyncJson.h>

namespace ih {

class web_interface {
public:
  web_interface(wifi_async& wifi_async, std::uint16_t port);

  void begin();

private:
  AsyncWebServer web_server_;
  wifi_async& wifi_async_;

  void web_server_on_post_(std::string uri, ArJsonRequestHandlerFunction handler);

  void handle_get_wifi_(AsyncWebServerRequest* request);
  void handle_get_connect_(AsyncWebServerRequest* request);
  void handle_post_connect_(AsyncWebServerRequest* request, JsonObject& body);
  void handle_delete_connect_(AsyncWebServerRequest* request);
};

}
