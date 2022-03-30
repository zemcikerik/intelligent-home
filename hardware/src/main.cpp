#include <Arduino.h>

#include <WiFi.h>
#include <string>
#include <DHT.h>

#include "ih/home.hpp"
#include "config.hpp"

constexpr uint16_t network_led = 19;
constexpr uint16_t ready_led = 22;

DHT dht{5, DHT22};

ih::home_manager home_manager;
ih::device device{ "d281dc06-284b-4378-8ce5-24e71911c60d", "Thermometer", "Indicates temperature" };

auto temp_feature_state = std::make_shared<ih::text_feature_state>("Waiting for update!");
ih::feature temp_feature{ "d081dc0a-284b-4378-1ce5-24e71911c60d", device.id, "Temperature", ih::feature_type::text, temp_feature_state };

auto hum_feature_state = std::make_shared<ih::text_feature_state>("Waiting for update!");
ih::feature hum_feature{ "d081dc0a-284a-4378-1ce5-24e71911c60d", device.id, "Humidity", ih::feature_type::text, hum_feature_state };

std::string format_value(float value, std::string suffix);

void setup() {
  Serial.begin(115200);
  esp_log_level_set("*", ESP_LOG_DEBUG);

  pinMode(network_led, OUTPUT);
  pinMode(ready_led, OUTPUT);
  dht.begin();

  WiFi.mode(WIFI_MODE_APSTA);
  WiFi.softAP(config::ap_ssid, config::ap_pswd);

  home_manager.set_device_info(device);
  home_manager.register_feature(temp_feature);
  home_manager.register_feature(hum_feature);

  home_manager.enable_web_server();
  home_manager.begin();

  xTaskCreate([](void*) {
    while (true) {
      const auto temperature = dht.readTemperature();
      const auto humidity = dht.readHumidity();

      temp_feature_state->text = format_value(temperature, " °C");
      home_manager.update_feature(temp_feature);

      hum_feature_state->text = format_value(humidity, " %");
      home_manager.update_feature(hum_feature);

      vTaskDelay(2000 / portTICK_PERIOD_MS);
    }
  }, "Sample Task", 4096, nullptr, 2, nullptr);
}

std::string format_value(float value, std::string suffix) {
  // workaround because of compiler bug
  std::stringstream ss;
  ss << value;
  ss << suffix;

  return ss.str();
}

void loop() {
  home_manager.loop();

  const auto state = home_manager.get_state();

  if (state > ih::home_state::waiting_for_network) {
    digitalWrite(network_led, HIGH);
    digitalWrite(ready_led, state == ih::home_state::ready ? HIGH : LOW);
  } else {
    digitalWrite(network_led, LOW);
    digitalWrite(ready_led, LOW);
  }
}
