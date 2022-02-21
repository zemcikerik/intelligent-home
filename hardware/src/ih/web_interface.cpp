#include "web_interface.hpp"

void ok_json(ih::web_request* request, JsonDocument& doc, std::size_t buffer_size = 1460U);
const char* enryption_type_to_string(wifi_auth_mode_t type);
const char* home_state_to_string(ih::home_state state);

void handle_get_wifi_status(ih::web_request* request);
void handle_post_wifi_status(ih::web_request* request, JsonObject& body);
void handle_delete_wifi_status(ih::web_request* request);

void handle_get_home_status(ih::web_request* request, ih::web_home_status& home_status);
void handle_set_home_server_info(ih::web_request* request, JsonObject& body, ih::web_home_server_info_consumer& server_info_consumer);

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

  if (this->home_status_handlers_.get_home_status) {
    this->web_server_.on("/api/home", WebRequestMethod::HTTP_GET, [this](AsyncWebServerRequest* request) {
      ih::web_home_status home_status = this->home_status_handlers_.get_home_status();
      handle_get_home_status(request, home_status);
    });
  }

  if (this->home_status_handlers_.set_home_server_info) {
    this->web_server_on_post_("/api/home", [this](AsyncWebServerRequest* request, JsonVariant& body) {
      JsonObject body_obj = body.as<JsonObject>();
      handle_set_home_server_info(request, body_obj, this->home_status_handlers_.set_home_server_info);
    });
  }

  if (this->home_status_handlers_.disconnect_home_server) {
    this->web_server_.on("/api/home", WebRequestMethod::HTTP_DELETE, [this](AsyncWebServerRequest* request) {
      request->send(this->home_status_handlers_.disconnect_home_server() ? 204 : 404);
    });
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

void ih::web_interface::enable_home_status_endpoints(const ih::web_home_status_handlers& handlers) {
  this->home_status_handlers_ = handlers;
}

void ih::web_interface::serve_static(fs::FS& fs, std::string fs_path, bool redirect_not_found_to_root) {
  this->web_server_.serveStatic("/", fs, fs_path.c_str())
    .setCacheControl("max-age=86400")
    .setDefaultFile("index.html");

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

void handle_get_home_status(ih::web_request* request, ih::web_home_status& home_status) {
  DynamicJsonDocument doc{ 1024 };
  doc["state"] = home_state_to_string(home_status.state);
  
  if (home_status.server_info.hostname != "") {
    doc["hasServerInfo"] = true;

    JsonObject server_info = doc.createNestedObject("serverInfo");
    server_info["hostname"] = home_status.server_info.hostname;
    server_info["port"] = home_status.server_info.port;
    server_info["path"] = home_status.server_info.ws_path;
  } else {
    doc["hasServerInfo"] = false;
  }

  ok_json(request, doc);
}

void handle_set_home_server_info(ih::web_request* request, JsonObject& body, ih::web_home_server_info_consumer& server_info_consumer) {
  if (!body.containsKey("hostname") || !body.containsKey("port") || !body.containsKey("path")) {
    request->send(400);
    return;
  }

  ih::home_server_info server_info{
    .hostname = body["hostname"],
    .port = body["port"],
    .ws_path = body["path"]
  };

  request->send(server_info_consumer(server_info) ? 204 : 404);
}

void ok_json(ih::web_request* request, JsonDocument& doc, std::size_t buffer_size) {
  const auto response = request->beginResponseStream("application/json", buffer_size);
  serializeJson(doc, *response);
  request->send(response);
}

const char* enryption_type_to_string(wifi_auth_mode_t type) {
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

const char* home_state_to_string(ih::home_state state) {
  switch (state) {
    case ih::home_state::waiting_for_network:     return "WAITING_FOR_NETWORK";
    case ih::home_state::waiting_for_server_info: return "WAITING_FOR_SERVER_INFO";
    case ih::home_state::connecting:              return "CONNECTING";
    case ih::home_state::auth:                    return "AUTH";
    case ih::home_state::ready:                   return "READY";
    default:                                      return "UNKNOWN";
  }
}
