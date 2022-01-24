package dev.zemco.intelligenthome.backend.auth;

import java.util.Optional;

public interface UserService {
    Optional<User> getUserByUsername(String username);
}
