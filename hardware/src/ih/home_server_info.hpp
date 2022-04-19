#pragma once
#include <string>
#include <ArduinoJson.h>

namespace ih {

struct home_server_info {
  std::string hostname;
  std::uint16_t port;
  std::string ws_path;

  template<typename TOutput>
  void to_json(TOutput& output) const;

  template<typename TInput>
  static home_server_info from_json(TInput& json_input);
};

template <typename TOutput>
void home_server_info::to_json(TOutput& output) const {
  DynamicJsonDocument doc{ 512 };

  doc["hostname"] = this->hostname;
  doc["port"] = this->port;
  doc["ws_path"] = this->ws_path;

  serializeJson(doc, output);
}

template<typename TInput>
ih::home_server_info ih::home_server_info::from_json(TInput& json_input) {
  DynamicJsonDocument doc{ 512 };
  deserializeJson(doc, json_input);

  return ih::home_server_info{
    .hostname = doc["hostname"],
    .port = doc["port"],
    .ws_path = doc["ws_path"]
  };
}

}
