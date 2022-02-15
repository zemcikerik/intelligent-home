#pragma once
#include <string>

namespace ih {

struct home_server_info {
  std::string hostname;
  std::uint16_t port;
  std::string ws_path;
};

}
