#include <Arduino.h>
#include <ESP32Servo.h>

#include <WiFi.h>
#include <string>

#include "ih/home.hpp"
#include "config.hpp"

constexpr uint16_t network_led = 18;
constexpr uint16_t ready_led = 19;
constexpr uint16_t status_led = 21;
constexpr uint16_t status_button = 22;
constexpr uint16_t servo_pin = 32;

ih::home_manager home_manager;
ih::device device{ "d081dc06-1000-4378-8ce5-24e71911c60d", "Garage doors", "Automated garage doors" };

Servo servo;
auto servo_feature_state = std::make_shared<ih::boolean_feature_state>(false);
ih::feature servo_feature{ "d081dc0a-1000-4378-8ce5-24e71911c60d", device.id, "Opened", ih::feature_type::boolean, servo_feature_state };

bool button_handled = false;
void set_servo(bool opened);

void setup() {
  Serial.begin(115200);
  esp_log_level_set("*", ESP_LOG_DEBUG);

  pinMode(network_led, OUTPUT);
  pinMode(ready_led, OUTPUT);
  pinMode(status_led, OUTPUT);
  pinMode(status_button, INPUT_PULLUP);
  pinMode(servo_pin, OUTPUT);

  ESP32PWM::allocateTimer(0);
  ESP32PWM::allocateTimer(1);
  ESP32PWM::allocateTimer(2);
  ESP32PWM::allocateTimer(3);
  servo.setPeriodHertz(50);
  servo.attach(servo_pin, 500, 2400);
  servo.write(0);

  WiFi.mode(WIFI_MODE_APSTA);
  WiFi.softAP(config::ap_ssid, config::ap_pswd);

  home_manager.set_device_info(device);
  home_manager.register_feature(servo_feature);

  home_manager.on_feature_update_request(servo_feature, [](ih::feature&, JsonObject& update) {
    set_servo(update["enabled"]);
  });

  home_manager.enable_web_server();
  home_manager.begin();
}

void loop() {
  home_manager.loop();

  if (!button_handled && digitalRead(status_button) == LOW) {
    set_servo(!servo_feature_state->enabled);
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

void set_servo(bool enabled) {
  servo.write(enabled ? 90 : 0);
  digitalWrite(status_led, enabled ? HIGH : LOW);
  servo_feature_state->enabled = enabled;
  home_manager.update_feature(servo_feature);
}
