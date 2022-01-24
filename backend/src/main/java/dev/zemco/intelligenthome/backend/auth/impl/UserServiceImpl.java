package dev.zemco.intelligenthome.backend.auth.impl;

import dev.zemco.intelligenthome.backend.auth.User;
import dev.zemco.intelligenthome.backend.auth.UserService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Override
    public Optional<User> getUserByUsername(String username) {
        return Optional.empty();
    }

}
