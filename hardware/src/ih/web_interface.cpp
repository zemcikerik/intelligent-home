#include "web_interface.hpp"
#include <ArduinoJson.h>

std::string enryption_type_to_string(wifi_auth_mode_t type);

ih::web_interface::web_interface(int port): web_server_(port) {
}

void ih::web_interface::begin() {
  this->web_server_.on("/wifi", [this]() {
    this->handle_get_wifi_();
  });

  this->web_server_.on("/connect", [this]() {
    this->handle_get_connect_();
  });

  this->web_server_.on("/connect", http_method::HTTP_POST, [this]() {
    this->handle_post_connect_();
  });

  this->web_server_.on("/connect", http_method::HTTP_DELETE, [this]() {
    this->handle_delete_connect_();
  });

  this->web_server_.begin();
}

void ih::web_interface::loop() {
  this->web_server_.handleClient();
}

void ih::web_interface::handle_get_wifi_() {
  // TODO: refactor me to wifi_scanner class with caching
  DynamicJsonDocument doc{ 2048 };
  JsonArray networks = doc.to<JsonArray>();

  short n = WiFi.scanNetworks();

  for (short i = 0; i < n; i++) {
    JsonObject network = networks.createNestedObject();
    network["ssid"] = WiFi.SSID(i);
    network["rssi"] = WiFi.RSSI(i);
    network["type"] = enryption_type_to_string(WiFi.encryptionType(i));
  }

  std::string json;
  serializeJson(doc, json);

  this->web_server_.send(200, "application/json", json.c_str());
}

void ih::web_interface::handle_get_connect_() {
  DynamicJsonDocument doc{ 1024 };

  doc["ssid"] = WiFi.SSID();
  doc["bssid"] = WiFi.BSSIDstr();
  doc["rssi"] = WiFi.RSSI();
  doc["ip"] = WiFi.localIP();

  std::string json;
  serializeJson(doc, json);

  this->web_server_.send(200, "application/json", json.c_str());
}

void ih::web_interface::handle_post_connect_() {
  // TODO: replace web server library
}

void ih::web_interface::handle_delete_connect_() {
  if (WiFi.isConnected()) {
    WiFi.disconnect();
    this->web_server_.send(204);
  } else {
    // TODO: check response code
    this->web_server_.send(400);
  }
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
