#include "device.hpp"
#include <ArduinoJson.h>

std::string ih::device::to_json() const {
  StaticJsonDocument<128> doc;
  doc["id"] = this->id;
  doc["name"] = this->name;

  std::string json;
  serializeJson(doc, json);
  return json;
}
