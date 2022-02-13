#include "web_interface.hpp"
#include <SPIFFS.h>

void ok_json(ih::web_request* request, JsonDocument& doc, std::size_t buffer_size = 1460U);
std::string enryption_type_to_string(wifi_auth_mode_t type);

void handle_get_wifi_status(ih::web_request* request);
void handle_post_wifi_status(ih::web_request* request, JsonObject& body);
void handle_delete_wifi_status(ih::web_request* request);

ih::web_interface::web_interface(std::uint16_t port): web_server_(port) {
}

ih::web_interface::~web_interface() {
  this->web_server_.end();
}

void ih::web_interface::begin() {
  if (this->wifi_scanner_ != nullptr) {
    this->web_server_.on("/api/wifi/networks", WebRequestMethod::HTTP_GET, [this](AsyncWebServerRequest* request) {
      this->handle_get_wifi_networks_(request);
    });
  }

  if (this->wifi_status_endpoints_) {
    this->web_server_.on("/api/wifi", WebRequestMethod::HTTP_GET, handle_get_wifi_status);

    this->web_server_on_post_("/api/wifi", [this](AsyncWebServerRequest* request, JsonVariant& body) {
      JsonObject body_obj = body.as<JsonObject>();
      handle_post_wifi_status(request, body_obj);
    });

    this->web_server_.on("/api/wifi", WebRequestMethod::HTTP_DELETE, handle_delete_wifi_status);
  }

  if (this->add_default_not_found_handler_) {
    this->web_server_.onNotFound([](AsyncWebServerRequest* request) {
      request->send(404);
    });
  }

  this->web_server_.begin();
}

void ih::web_interface::enable_wifi_status_endpoints() {
  this->wifi_status_endpoints_ = true;
}

void ih::web_interface::enable_wifi_network_endpoints(std::shared_ptr<ih::wifi_scanner> wifi_scanner) {
  this->wifi_scanner_ = wifi_scanner;
}

void ih::web_interface::serve_static(fs::FS& fs, std::string fs_path, bool redirect_not_found_to_root) {
  this->web_server_.serveStatic("/", fs, fs_path.c_str());

  if (redirect_not_found_to_root) {
    this->add_default_not_found_handler_ = false;

    this->web_server_.onNotFound([](AsyncWebServerRequest* request) {
      request->redirect("/");
    });
  }
}

void ih::web_interface::web_server_on_post_(std::string uri, ArJsonRequestHandlerFunction handler) {
  const auto request_handler = new AsyncCallbackJsonWebHandler{ uri.c_str(), handler };
  request_handler->setMethod(WebRequestMethod::HTTP_POST);
  this->web_server_.addHandler(request_handler);
}

void ih::web_interface::handle_get_wifi_networks_(ih::web_request* request) {
  const auto networks = this->wifi_scanner_->get_networks();

  DynamicJsonDocument doc{ 2048 };
  JsonArray json = doc.to<JsonArray>();

  for (const auto& network : *networks) {
    JsonObject json_network = json.createNestedObject();
    json_network["ssid"] = network.ssid;
    json_network["rssi"] = network.rssi;
    json_network["channel"] = network.channel;
    json_network["type"] = enryption_type_to_string(network.type);
  }

  ok_json(request, doc, 2048);
}

void handle_get_wifi_status(ih::web_request* request) {
  if (WiFi.isConnected()) {
    DynamicJsonDocument doc{ 1024 };
    doc["connected"] = true;
    doc["ssid"] = WiFi.SSID();
    doc["bssid"] = WiFi.BSSIDstr();
    doc["rssi"] = WiFi.RSSI();
    doc["ip"] = WiFi.localIP();

    ok_json(request, doc);
  } else {
    request->send(200, "application/json", "{\"connected\":false}");
  }
}

void handle_post_wifi_status(ih::web_request* request, JsonObject& body) {
  if (!body.containsKey("ssid") || !body.containsKey("pswd")) {
    request->send(400);
    return;
  }

  const char* ssid = body["ssid"];
  const char* pswd = body["pswd"];

  WiFi.begin(ssid, pswd);
  request->send(204);
}

void handle_delete_wifi_status(ih::web_request* request) {
  if (WiFi.isConnected()) {
    WiFi.disconnect();
    request->send(204);
  } else {
    request->send(404);
  }
}

void ok_json(ih::web_request* request, JsonDocument& doc, std::size_t buffer_size) {
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
