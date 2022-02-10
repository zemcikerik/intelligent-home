#include <Arduino.h>

#include <WiFi.h>
#include <WebSocketsClient.h>
#include <string>

#include "intelligent_home.hpp"
#include "config.hpp"

WebSocketsClient ws_client;
ih::stomp_client stomper{ ws_client };
ih::home_manager home_manager{ stomper };

ih::device device{ "d081dc06-284b-4378-8ce5-24e71911c60d", "ESP32" };
ih::feature buzzer_feature{ "a081dc0a-284b-4378-8ce5-24e71911c60d", device.id, "Buzzer", ih::feature_type::button, nullptr };

auto led_feature_state = std::make_shared<ih::boolean_feature_state>(true);
ih::feature led_feature{ "d081dc0a-284b-4378-8ce5-24e71911c60d", device.id, "Built-in LED", ih::feature_type::boolean, led_feature_state };

TaskHandle_t sample_task = nullptr;
auto value_reader_feature_state = std::make_shared<ih::text_feature_state>("Waiting for sample!");
ih::feature value_reader_feature{ "b081dc0a-284b-4378-8ce5-24e71911c60d", device.id, "Value Reader", ih::feature_type::text, value_reader_feature_state };

TaskHandle_t buzzer_task = nullptr;
auto dropdown_feature_state = std::make_shared<ih::dropdown_feature_state>(std::vector<std::string>{ "First", "Second", "Third" }, "Second");
ih::feature dropdown_feature{ "b081dc0a-284b-4378-8ce5-24e71911c60a", device.id, "Test Dropdown", ih::feature_type::dropdown, dropdown_feature_state };

void setup_wifi(const char* ssid, const char* password);
void sample(void*);
void buzzer(void*);

void setup() {
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);
  ledcAttachPin(15, 0);

  setup_wifi(config::wifi_ssid, config::wifi_pswd);

  home_manager.register_device(device);
  home_manager.register_feature(led_feature);
  home_manager.register_feature(buzzer_feature);
  home_manager.register_feature(value_reader_feature);
  home_manager.register_feature(dropdown_feature);

  home_manager.on_feature_update_request(led_feature, [](ih::feature& feature, JsonObject& update) {
    led_feature_state->enabled = update["enabled"];
    digitalWrite(LED_BUILTIN, led_feature_state->enabled);
    home_manager.update_feature(led_feature);
  });

  home_manager.on_feature_update_request(buzzer_feature, [](ih::feature&, JsonObject&) {
    if (buzzer_task == nullptr) {
      xTaskCreate(buzzer, "Buzzer", 2048, nullptr, 3, &buzzer_task);
    }
  });

  stomper.on_unknown([](const ih::stomp_message& message) {
    Serial.print("Unknown command: ");
    Serial.println(message.command.c_str());
  });

  stomper.begin(config::hostname, config::port, config::ws_path);

  if (sample_task == nullptr) {
    xTaskCreate(sample, "Sampler", 4096, nullptr, 2, &sample_task);
  }
}

void sample(void*) {
  while (true) {
    vTaskDelay(200 / portTICK_PERIOD_MS);

    // because of c++ compiler bug on win
    std::ostringstream ss;
    ss << analogRead(34);

    value_reader_feature_state->text = ss.str();
    home_manager.update_feature(value_reader_feature);
  }
}

void buzzer(void*) {
  ledcWriteNote(0, NOTE_C, 4);
  vTaskDelay(500 / portTICK_PERIOD_MS);
  ledcWriteTone(0, 0);

  buzzer_task = nullptr;
  vTaskDelete(nullptr);
}

void loop() {
  ws_client.loop();
}

void setup_wifi(const char* ssid, const char* password) {
  WiFi.mode(WIFI_MODE_STA);
  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi...");

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(100);
  }

  Serial.println();
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}
