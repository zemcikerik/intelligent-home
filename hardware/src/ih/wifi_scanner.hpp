#pragma once
#include <memory>
#include <vector>
#include <WiFi.h>

namespace ih {

struct wifi_info {
  std::string ssid;
  std::int8_t rssi;
  std::int32_t channel;
  wifi_auth_mode_t type;
};

using wifi_info_vector_ptr = std::shared_ptr<std::vector<wifi_info>>;

class wifi_scanner {
public:
  wifi_scanner();
  ~wifi_scanner();

  void trigger_scan();
  wifi_info_vector_ptr get_networks() const;
  void erase();

private:
  wifi_info_vector_ptr networks_;
  wifi_event_id_t scan_callback_handle_;
  TimerHandle_t timer_handle_;

  void trigger_scan_(bool reset_timer);
  void on_scan_finished_();
};

}
