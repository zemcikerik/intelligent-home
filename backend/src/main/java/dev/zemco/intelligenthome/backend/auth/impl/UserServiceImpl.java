package dev.zemco.intelligenthome.backend.auth.impl;

import dev.zemco.intelligenthome.backend.auth.User;
import dev.zemco.intelligenthome.backend.auth.dto.UserCreationDto;
import dev.zemco.intelligenthome.backend.auth.UserRepository;
import dev.zemco.intelligenthome.backend.auth.UserService;
import dev.zemco.intelligenthome.backend.auth.exception.UserAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User createUser(UserCreationDto userCreationDto) {
        this.throwIfUserWithUsernameExists(userCreationDto.getUsername());

        User user = new User();
        user.setUsername(userCreationDto.getUsername());
        user.setPassword(this.passwordEncoder.encode(userCreationDto.getPassword()));
        user.setRole(userCreationDto.getRole());

        return this.userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    private void throwIfUserWithUsernameExists(String username) {
        Optional<User> foundUser = this.userRepository.findByUsername(username);

        if (foundUser.isPresent()) {
            throw new UserAlreadyExistsException(username);
        }
    }

}
