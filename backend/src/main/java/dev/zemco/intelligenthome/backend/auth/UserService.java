package dev.zemco.intelligenthome.backend.auth;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(UserCreationDto userCreationDto);
    List<User> getAllUsers();
    Optional<User> getUserByUsername(String username);
}
