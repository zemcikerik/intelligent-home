#include <Arduino.h>

#include <WiFi.h>
#include <string>
#include <SPIFFS.h>

#include "ih/home.hpp"
#include "config.hpp"

constexpr uint16_t network_led = 18;
constexpr uint16_t ready_led = 19;
constexpr uint16_t status_led = 21;
constexpr uint16_t status_button = 22;
constexpr uint16_t relay_pin = 32;

ih::home_manager home_manager;
ih::device device{ "d081dc06-284b-4378-8ce5-24e71911c60d", "Power Outlet", "Controls flow of electricity" };

auto relay_feature_state = std::make_shared<ih::boolean_feature_state>(false);
ih::feature relay_feature{ "d081dc0a-284b-4378-8ce5-24e71911c60d", device.id, "Enabled", ih::feature_type::boolean, relay_feature_state };

bool button_handled = false;
void set_relay(bool enabled);

void setup() {
  Serial.begin(115200);
  esp_log_level_set("*", ESP_LOG_DEBUG);

  if (!SPIFFS.begin()) {
    Serial.println("SPIFFS begin() failed - formatting");
    SPIFFS.format();
  }

  pinMode(network_led, OUTPUT);
  pinMode(ready_led, OUTPUT);
  pinMode(status_led, OUTPUT);
  pinMode(status_button, INPUT_PULLUP);
  pinMode(relay_pin, OUTPUT);

  WiFi.mode(WIFI_MODE_APSTA);
  WiFi.softAP(config::ap_ssid, config::ap_pswd);

  home_manager.set_device_info(device);
  home_manager.register_feature(relay_feature);

  home_manager.on_feature_update_request(relay_feature, [](ih::feature&, JsonObject& update) {
    set_relay(update["enabled"]);
  });

  home_manager.enable_web_server();
  home_manager.begin();
}

void loop() {
  home_manager.loop();

  if (!button_handled && digitalRead(status_button) == LOW) {
    set_relay(!relay_feature_state->enabled);
    delay(200);
  } else if (digitalRead(status_button) == HIGH) {
    button_handled = false;
  }

  const auto state = home_manager.get_state();

  if (state > ih::home_state::waiting_for_network) {
    digitalWrite(network_led, HIGH);
    digitalWrite(ready_led, state == ih::home_state::ready ? HIGH : LOW);
  } else {
    digitalWrite(network_led, LOW);
    digitalWrite(ready_led, LOW);
  }
}

void set_relay(bool enabled) {
  digitalWrite(relay_pin, enabled ? HIGH : LOW);
  digitalWrite(status_led, enabled ? HIGH : LOW);
  relay_feature_state->enabled = enabled;
  home_manager.update_feature(relay_feature);
}
