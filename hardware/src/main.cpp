#include <Arduino.h>

#include <WiFi.h>
#include <string>
#include <SPIFFS.h>

#include "intelligent_home.hpp"
#include "config.hpp"

// only during development
WebSocketsClient* cursed_temp_variable = nullptr;

ih::home_manager home_manager;
ih::device device{ "d081dc06-284b-4378-8ce5-24e71911c60d", "ESP32" };

ih::feature buzzer_feature{ "a081dc0a-284b-4378-8ce5-24e71911c60d", device.id, "Buzzer", ih::feature_type::button, nullptr };

auto led_feature_state = std::make_shared<ih::boolean_feature_state>(true);
ih::feature led_feature{ "d081dc0a-284b-4378-8ce5-24e71911c60d", device.id, "Built-in LED", ih::feature_type::boolean, led_feature_state };

auto value_reader_feature_state = std::make_shared<ih::text_feature_state>("Waiting for sample!");
ih::feature value_reader_feature{ "b081dc0a-284b-4378-8ce5-24e71911c60d", device.id, "Value Reader", ih::feature_type::text, value_reader_feature_state };

auto dropdown_feature_state = std::make_shared<ih::dropdown_feature_state>(std::vector<std::string>{ "First", "Second", "Third" }, "Second");
ih::feature dropdown_feature{ "b081dc0a-284b-4378-8ce5-24e71911c60a", device.id, "Test Dropdown", ih::feature_type::dropdown, dropdown_feature_state };

void setup_wifi(const char* ssid, const char* password);
void begin_wifi_scan(void*);
void sample(void*);
void buzzer(void*);

void setup() {
  esp_log_level_set("*", ESP_LOG_DEBUG);

  Serial.begin(115200);

  if(!SPIFFS.begin()){
    Serial.println("An Error has occurred while mounting SPIFFS!");
    return;
  }

  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);

  WiFi.mode(WIFI_MODE_APSTA);
  WiFi.softAP(config::ap_ssid, config::ap_pswd);

  home_manager.set_device_info(device);
  home_manager.register_feature(buzzer_feature);
  home_manager.register_feature(led_feature);
  home_manager.register_feature(value_reader_feature);
  home_manager.register_feature(dropdown_feature);

  home_manager.on_feature_update_request(led_feature, [](ih::feature&, JsonObject& update) {
    led_feature_state->enabled = update["enabled"];
    digitalWrite(LED_BUILTIN, led_feature_state->enabled);
    home_manager.update_feature(led_feature);
  });

  home_manager.enable_web_server();
  home_manager.begin();
}

void loop() {
  if (cursed_temp_variable) {
    cursed_temp_variable->loop();
  }
}
