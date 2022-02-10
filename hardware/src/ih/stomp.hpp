#pragma once
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

class stomp_client {
public:
  stomp_client(WebSocketsClient& ws_client);

  void begin(const std::string hostname, const int port, const std::string path);
  void send(const std::string destination, const std::string body);
  void subscribe(const std::string destination, stomp_handler handler);
  void unsubscribe(const stomp_subscription_token subscription_token);

  void on_connect(stomp_handler handler);
  void on_error(stomp_handler handler);
  void on_unknown(stomp_handler handler);

  stomp_state get_state() const;

private:
  void handle_websocket_event_(const WStype_t& type, uint8_t* payload, const size_t& length);
  void handle_connect_(const stomp_message& message);
  void handle_message_(const stomp_message& message);
  void connect_();
  void send_sstream_(std::ostringstream& ss);
  static void parse_message_(const std::string& data, stomp_message& out_message);

  WebSocketsClient& ws_client_;
  stomp_state state_;
  std::vector<stomp_subscription> subscriptions_;
  stomp_subscription_token next_subscription_token_;

  stomp_handler connect_handler_;
  stomp_handler error_handler_;
  stomp_handler unknown_handler_;
};

}
