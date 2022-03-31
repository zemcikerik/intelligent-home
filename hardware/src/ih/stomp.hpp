#pragma once
#include <cstdlib>
#include <functional>
#include <string>
#include <sstream>
#include <vector>
#include <WebSocketsClient.h>

namespace ih {

using stomp_subscription_token = uint16_t;
using stomp_header = std::pair<std::string, std::string>;
using stomp_headers = std::vector<stomp_header>;

struct stomp_message {
  std::string command;
  stomp_headers headers;
  std::string body;
};

using stomp_handler = std::function<void (const stomp_message& message)>;
using stomp_disconnect_handler = std::function<void ()>;

struct stomp_subscription {
  stomp_subscription_token token;
  stomp_handler handler;
};

enum class stomp_state {
  waiting,
  connecting,
  connected,
  disconnected
};

using stomp_heartbeat_sender = std::function<void ()>;

class stomp_heartbeat_helper {
public:
  stomp_heartbeat_helper(const stomp_message& connect_message);
  ~stomp_heartbeat_helper();

  void on_client_message();
  void on_server_heartbeat();
  void set_heartbeat_sender(stomp_heartbeat_sender sender);

private:
  std::uint32_t client_heartbeat_interval_;
  std::uint32_t server_heartbeat_interval_;

  TimerHandle_t client_timer_handle_ = nullptr;
  TimerHandle_t server_timer_handle_ = nullptr;

  stomp_heartbeat_sender heartbeat_sender_;
};

class stomp_client {
public:
  stomp_client();
  ~stomp_client();

  void begin(const std::string hostname, const int port, const std::string path);
  void loop();
  void end();
  void close_connection();

  void send(const std::string destination, const std::string body);
  void subscribe(const std::string destination, stomp_handler handler);
  void unsubscribe(const stomp_subscription_token subscription_token);

  void on_connect(stomp_handler handler);
  void on_disconnect(stomp_disconnect_handler handler);
  void on_error(stomp_handler handler);
  void on_unknown(stomp_handler handler);

  stomp_state get_state() const;

private:
  void handle_websocket_event_(WStype_t type, uint8_t* payload, size_t length);
  void handle_text_websocket_event_(const char* payload, size_t length);
  void handle_connect_(const stomp_message& message);
  void handle_disconnect_();
  void handle_message_(const stomp_message& message);
  void handle_error_(const stomp_message& message);
  void handle_recepit_(const stomp_message& message);
  void handle_unknown_(const stomp_message& message);

  void send_connect_frame_();
  void send_end_frame_();

  void send_sstream_(std::ostringstream& ss, bool reset_heartbeat = true);
  static void parse_message_(const std::string& data, stomp_message& out_message);

  WebSocketsClient ws_client_;
  std::unique_ptr<stomp_heartbeat_helper> heartbeat_helper_;
  bool should_trigger_disconnect_handler_ = false;

  stomp_state state_;
  std::vector<stomp_subscription> subscriptions_;
  stomp_subscription_token next_subscription_token_;

  stomp_handler connect_handler_;
  stomp_disconnect_handler disconnect_handler_;
  stomp_handler error_handler_;
  stomp_handler unknown_handler_;
};

}
