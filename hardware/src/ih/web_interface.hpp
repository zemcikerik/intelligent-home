#pragma once
#include <WebServer.h>

namespace ih {

class web_interface {
public:
  web_interface(int port);

  void begin();
  void loop();

private:
  WebServer web_server_;

  void handle_get_wifi_();
  void handle_get_connect_();
  void handle_post_connect_();
  void handle_delete_connect_();
};

}
