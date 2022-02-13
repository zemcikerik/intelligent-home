#include "wifi_scanner.hpp"

ih::wifi_scanner::wifi_scanner() {
  this->erase();

  scan_callback_handle_ = WiFi.onEvent([this](system_event_id_t, system_event_info_t) {
    this->on_scan_finished_();
  }, system_event_id_t::SYSTEM_EVENT_SCAN_DONE);

  const auto timer_callback = [](TimerHandle_t handle) {
    const auto scanner = reinterpret_cast<wifi_scanner*>(pvTimerGetTimerID(handle));
    scanner->trigger_scan_(false);
  };

  this->timer_handle_ = xTimerCreate("Wifi Scanner", pdMS_TO_TICKS(15000), pdTRUE, this, timer_callback);
  xTimerStart(this->timer_handle_, portMAX_DELAY);
}

ih::wifi_scanner::~wifi_scanner() {
  WiFi.removeEvent(this->scan_callback_handle_);
  xTimerStop(this->timer_handle_, portMAX_DELAY);
  xTimerDelete(this->timer_handle_, portMAX_DELAY);
}

void ih::wifi_scanner::trigger_scan() {
  this->trigger_scan_(true);
}

ih::wifi_info_vector_ptr ih::wifi_scanner::get_networks() const {
  return this->networks_;
}

void ih::wifi_scanner::erase() {
  this->networks_ = std::make_shared<std::vector<wifi_info>>();
}

void ih::wifi_scanner::trigger_scan_(bool reset_timer) {
  if (WiFi.scanComplete() != WIFI_SCAN_RUNNING) {
    WiFi.scanNetworks(true);

    if (reset_timer) {
      xTimerReset(this->timer_handle_, portMAX_DELAY);
    }
  }
}

void ih::wifi_scanner::on_scan_finished_() {
  const auto networks = std::make_shared<std::vector<wifi_info>>();
  const std::int16_t n = WiFi.scanComplete();
  wifi_info entry;

  for (std::int16_t i = 0; i < n; i++) {
    entry.ssid = WiFi.SSID(i).c_str();
    entry.rssi = WiFi.RSSI(i);
    entry.channel = WiFi.channel(i);
    entry.type = WiFi.encryptionType(i);
    networks->push_back(entry);
  }

  this->networks_ = std::move(networks);
  WiFi.scanDelete();
}
