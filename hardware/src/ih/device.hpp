#pragma once
#include <string>

namespace ih {

struct device {
  std::string id;
  std::string name;

  std::string to_json() const;
};

}