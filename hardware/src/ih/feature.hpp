#pragma once
#include <ArduinoJson.h>
#include <memory>
#include <vector>

namespace ih {

struct feature_state;

enum class feature_type {
  boolean,
  button,
  dropdown,
  integer,
  string,
  text
};

struct feature {
  std::string id;
  std::string device_id;
  std::string name;
  feature_type type;
  std::shared_ptr<feature_state> state;

  std::string to_json() const;
};

struct feature_state {
  std::string to_json() const;
  virtual void to_json(JsonObject& json) const = 0;
};

struct boolean_feature_state: public feature_state {
  bool enabled;
  
  boolean_feature_state();
  boolean_feature_state(bool enabled);
  void to_json(JsonObject& json) const override;
};

struct dropdown_feature_state: public feature_state {
  std::vector<std::string> choices;
  std::string selected;

  // TODO: do something about copying here
  dropdown_feature_state(std::vector<std::string> choices);
  dropdown_feature_state(std::vector<std::string> choices, std::string selected);
  void to_json(JsonObject& json) const override;
};

struct integer_feature_state: public feature_state {
  int value;

  integer_feature_state();
  integer_feature_state(int value);
  void to_json(JsonObject& json) const override;
};

struct string_feature_state: public feature_state {
  std::string text;

  string_feature_state();
  string_feature_state(std::string text);
  void to_json(JsonObject& json) const override;
};

struct text_feature_state: public feature_state {
  std::string text;

  text_feature_state();
  text_feature_state(std::string text);
  void to_json(JsonObject& json) const override;
};

}
