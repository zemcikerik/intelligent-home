#pragma once
#include <ArduinoJson.h>
#include <WiFi.h>

namespace ih {

class wifi_json_helper {
public:
  template <typename TOutput>
  static void current_wifi_to_json(TOutput& output);

  template <typename TInput>
  static void wifi_begin_from_json(TInput& json_input);
};

template <typename TOutput>
void wifi_json_helper::current_wifi_to_json(TOutput& output) {
  DynamicJsonDocument doc{ 256 };
  doc["ssid"] = WiFi.SSID();
  doc["pswd"] = WiFi.psk();

  serializeJson(doc, output);
}

template <typename TInput>
void wifi_json_helper::wifi_begin_from_json(TInput& json_input) {
  if (WiFi.isConnected()) {
    WiFi.disconnect();
  }

  DynamicJsonDocument doc{ 256 };
  deserializeJson(doc, json_input);

  const char* ssid = doc["ssid"];
  const char* pswd = doc["pswd"];

  WiFi.begin(ssid, pswd);
}

}
