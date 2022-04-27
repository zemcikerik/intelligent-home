#include "feature.hpp"

std::string feature_type_to_string(const ih::feature_type type);

std::string ih::feature::to_json() const {
  DynamicJsonDocument doc{ 1024 };

  doc["id"] = this->id;
  doc["deviceId"] = this->device_id;
  doc["name"] = this->name;
  doc["type"] = feature_type_to_string(this->type);
  
  if (this->state != nullptr) {
    auto stateJson = doc.createNestedObject("state");
    this->state->to_json(stateJson);
  }

  std::string json;
  serializeJson(doc, json);
  return json;
}

std::string ih::feature_state::to_json() const {
  StaticJsonDocument<256> doc;
  
  JsonObject obj = doc.to<JsonObject>();
  this->to_json(obj);

  std::string json;
  serializeJson(doc, json);
  return json;
}

ih::boolean_feature_state::boolean_feature_state(): enabled(false) {
}

ih::boolean_feature_state::boolean_feature_state(bool enabled): enabled(enabled) {
}

void ih::boolean_feature_state::to_json(JsonObject& json) const {
  json["enabled"] = this->enabled;
}

ih::dropdown_feature_state::dropdown_feature_state(std::vector<std::string> choices): choices(choices), selected(choices.at(0)) {
}

ih::dropdown_feature_state::dropdown_feature_state(std::vector<std::string> choices, std::string selected): choices(choices), selected(selected) {
}

void ih::dropdown_feature_state::to_json(JsonObject& json) const {
  auto choicesJson = json.createNestedArray("choices");

  for (auto& choice : this->choices) {
    choicesJson.add(choice);
  }

  json["selected"] = this->selected;
}

ih::integer_feature_state::integer_feature_state(): value(0) {
}

ih::integer_feature_state::integer_feature_state(int value): value(value) {
}

void ih::integer_feature_state::to_json(JsonObject& json) const {
  json["value"] = this->value;
}

ih::string_feature_state::string_feature_state(): text("") {
}

ih::string_feature_state::string_feature_state(std::string text): text(text) {
}

void ih::string_feature_state::to_json(JsonObject& json) const {
  json["text"] = this->text;
}

ih::text_feature_state::text_feature_state(): text("") {
}

ih::text_feature_state::text_feature_state(std::string text): text(text) {
}

void ih::text_feature_state::to_json(JsonObject& json) const {
  json["text"] = this->text;
}

std::string feature_type_to_string(const ih::feature_type type) {
  switch (type) {
    case ih::feature_type::boolean:   return "BOOLEAN";
    case ih::feature_type::button:    return "BUTTON";
    case ih::feature_type::dropdown:  return "DROPDOWN";
    case ih::feature_type::integer:   return "INTEGER";
    case ih::feature_type::string:    return "STRING";
    case ih::feature_type::text:      return "TEXT";
    default:                          return "UNKNOWN";
  }
}
