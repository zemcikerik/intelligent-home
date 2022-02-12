#pragma once
#include <functional>
#include <string>
#include <vector>

#include <ArduinoJson.h>
#include <WiFi.h>

namespace ih {

struct wifi_info {
  std::string ssid;
  std::int8_t rssi;
  std::int32_t channel;
  wifi_auth_mode_t type;
};

using wifi_info_callback = std::function<void (std::vector<wifi_info>& networks)>;
using wifi_connect_callback = std::function<void (bool success)>;

struct wifi_connect_entry {
  wifi_connect_callback callback;
  wifi_event_id_t event_handle;
  TimerHandle_t timeout_handle;
};

class wifi_async {
public:
  wifi_async();
  ~wifi_async();
  
  void connect(std::string ssid, std::string pswd, wifi_connect_callback callback);
  void get_available_networks(wifi_info_callback callback);

  // for internal use only
  // TODO: try to find a way to make this private
  void connect_callback_(bool success);

private:
  void on_scan_finished_();

  wifi_connect_entry* connect_entry_;
  wifi_event_id_t scan_finished_callback_handle_;
  std::vector<wifi_info_callback> callbacks_;
};

}
