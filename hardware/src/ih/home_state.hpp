#pragma once

namespace ih {

enum class home_state {
  waiting_for_network,
  waiting_for_server_info,
  connecting,
  auth,
  ready
};

}
