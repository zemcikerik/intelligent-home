#include "web_interface.hpp"
#include <SPIFFS.h>

void ok_json(AsyncWebServerRequest* request, JsonDocument& doc, std::size_t buffer_size = 1460U);
std::string enryption_type_to_string(wifi_auth_mode_t type);

ih::web_interface::web_interface(ih::wifi_async& wifi_async, std::uint16_t port): web_server_(port), wifi_async_(wifi_async) {
}

void ih::web_interface::begin() {
  this->web_server_.on("/api/wifi", WebRequestMethod::HTTP_GET, [this](AsyncWebServerRequest* request) {
    this->handle_get_wifi_(request);
  });

  this->web_server_.on("/api/connect", WebRequestMethod::HTTP_GET, [this](AsyncWebServerRequest* request) {
    this->handle_get_connect_(request);
  });

  this->web_server_on_post_("/api/connect", [this](AsyncWebServerRequest* request, JsonVariant& body) {
    JsonObject body_obj = body.as<JsonObject>();
    this->handle_post_connect_(request, body_obj);
  });

  this->web_server_.on("/api/connect", WebRequestMethod::HTTP_DELETE, [this](AsyncWebServerRequest* request) {
    this->handle_delete_connect_(request);
  });

  this->web_server_.onNotFound([this](AsyncWebServerRequest* request) {
    request->redirect("/");
  });

  this->web_server_.begin();
}

void ih::web_interface::web_server_on_post_(std::string uri, ArJsonRequestHandlerFunction handler) {
  const auto request_handler = new AsyncCallbackJsonWebHandler{ uri.c_str(), handler };
  request_handler->setMethod(WebRequestMethod::HTTP_POST);
  this->web_server_.addHandler(request_handler);
}

void ih::web_interface::handle_get_wifi_(AsyncWebServerRequest* request) {
  this->wifi_async_.get_available_networks([request](std::vector<ih::wifi_info>& networks) {
    DynamicJsonDocument doc{ 2048 };
    JsonArray json = doc.to<JsonArray>();

    for (const auto& network : networks) {
      JsonObject json_network = json.createNestedObject();
      json_network["ssid"] = network.ssid;
      json_network["rssi"] = network.rssi;
      json_network["channel"] = network.channel;
      json_network["type"] = enryption_type_to_string(network.type);
    }

    ok_json(request, doc, 2048);
  });
}

void ih::web_interface::handle_get_connect_(AsyncWebServerRequest* request) {
  if (WiFi.isConnected()) {
    DynamicJsonDocument doc{ 1024 };
    doc["connected"] = true;
    doc["ssid"] = WiFi.SSID();
    doc["bssid"] = WiFi.BSSIDstr();
    doc["rssi"] = WiFi.RSSI();
    doc["ip"] = WiFi.localIP();

    ok_json(request, doc);
  } else {
    StaticJsonDocument<64> doc;
    doc["connected"] = false;
    ok_json(request, doc);
  }
}

void ih::web_interface::handle_post_connect_(AsyncWebServerRequest* request, JsonObject& body) {
  if (!body.containsKey("ssid") || !body.containsKey("pswd")) {
    request->send(400);
    return;
  }

  const std::string ssid = body["ssid"];
  const std::string pswd = body["pswd"];

  this->wifi_async_.connect(ssid, pswd, [request](bool success) {
    request->send(success ? 204 : 403);
  });
}

void ih::web_interface::handle_delete_connect_(AsyncWebServerRequest* request) {
  if (WiFi.isConnected()) {
    WiFi.disconnect();
    request->send(204);
  } else {
    request->send(404);
  }
}

void ok_json(AsyncWebServerRequest* request, JsonDocument& doc, std::size_t buffer_size) {
  const auto response = request->beginResponseStream("application/json", buffer_size);
  serializeJson(doc, *response);
  request->send(response);
}

std::string enryption_type_to_string(wifi_auth_mode_t type) {
  switch (type) {
    case wifi_auth_mode_t::WIFI_AUTH_OPEN:            return "OPEN";
    case wifi_auth_mode_t::WIFI_AUTH_WEP:             return "WEP";
    case wifi_auth_mode_t::WIFI_AUTH_WPA_PSK:         return "WPA_PSK";
    case wifi_auth_mode_t::WIFI_AUTH_WPA2_PSK:        return "WPA2_PSK";
    case wifi_auth_mode_t::WIFI_AUTH_WPA_WPA2_PSK:    return "WPA_WPA2_PSK";
    case wifi_auth_mode_t::WIFI_AUTH_WPA2_ENTERPRISE: return "WPA2_ENTERPRISE";
    default:                                          return "UNKNOWN";
  }
}
