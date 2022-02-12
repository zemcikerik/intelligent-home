#include "wifi_async.hpp"
#include <WiFi.h>

ih::wifi_async::wifi_async() {
  this->scan_finished_callback_handle_ = WiFi.onEvent([this](system_event_id_t, system_event_info_t) {
    this->on_scan_finished_();
  }, system_event_id_t::SYSTEM_EVENT_SCAN_DONE);
}

ih::wifi_async::~wifi_async() {
  WiFi.removeEvent(this->scan_finished_callback_handle_);
}

void connect_timeout_callback(TimerHandle_t handle) {
  const auto wifi = reinterpret_cast<ih::wifi_async*>(pvTimerGetTimerID(handle));
  wifi->connect_callback_(false);
}

// TODO: fix me
void ih::wifi_async::connect(std::string ssid, std::string pswd, wifi_connect_callback callback) {
  // wait until previous connect finishes
  while (this->connect_entry_ != nullptr) {
    vTaskDelay(100 / portTICK_RATE_MS);
  }

  WiFi.disconnect();

  this->connect_entry_ = new wifi_connect_entry{};
  this->connect_entry_->callback = callback;

  this->connect_entry_->event_handle = WiFi.onEvent([this](system_event_id_t event, system_event_info_t info) {
    if (event == system_event_id_t::SYSTEM_EVENT_STA_CONNECTED) {
      this->connect_callback_(true);
    } else if (event == system_event_id_t::SYSTEM_EVENT_STA_DISCONNECTED && info.disconnected.reason != WIFI_REASON_ASSOC_LEAVE) {
      this->connect_callback_(false);
    }
  });

  this->connect_entry_->timeout_handle = xTimerCreate("WiFi Connect Timer", pdMS_TO_TICKS(10000), pdFALSE, this, connect_timeout_callback);
  xTimerStart(this->connect_entry_->timeout_handle, portMAX_DELAY);

  WiFi.begin(ssid.c_str(), pswd.c_str());
}

void ih::wifi_async::get_available_networks(wifi_info_callback callback) {
  const auto n = WiFi.scanComplete();

  // scan was not started yet
  if (n == -2) {
    WiFi.scanNetworks(true);
  }

  this->callbacks_.push_back(callback);
}

void ih::wifi_async::connect_callback_(bool success) {
  const auto entry = this->connect_entry_;

  if (entry != nullptr) {
    this->connect_entry_ = nullptr;

    xTimerStop(entry->timeout_handle, portMAX_DELAY);
    WiFi.removeEvent(entry->event_handle);

    entry->callback(success);
    
    xTimerDelete(entry->timeout_handle, portMAX_DELAY);
    delete entry;
  }
}

void ih::wifi_async::on_scan_finished_() {
  const std::int16_t n = WiFi.scanComplete();

  wifi_info network;
  std::vector<wifi_info> networks;

  for (std::int16_t i = 0; i < n; i++) {
    network.ssid = WiFi.SSID(i).c_str();
    network.rssi = WiFi.RSSI(i);
    network.channel = WiFi.channel(i);
    network.type = WiFi.encryptionType(i);

    networks.push_back(network);
  }

  for (const auto& callback : this->callbacks_) {
    callback(networks);
  }

  this->callbacks_.clear();
  WiFi.scanDelete();
}
