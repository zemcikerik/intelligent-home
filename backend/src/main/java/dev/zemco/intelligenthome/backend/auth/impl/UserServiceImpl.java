package dev.zemco.intelligenthome.backend.auth.impl;

import dev.zemco.intelligenthome.backend.auth.User;
import dev.zemco.intelligenthome.backend.auth.dto.UserCreationDto;
import dev.zemco.intelligenthome.backend.auth.UserRepository;
import dev.zemco.intelligenthome.backend.auth.UserService;
import dev.zemco.intelligenthome.backend.auth.dto.UserDto;
import dev.zemco.intelligenthome.backend.auth.dto.UserUpdateDto;
import dev.zemco.intelligenthome.backend.auth.exception.UserAlreadyExistsException;
import dev.zemco.intelligenthome.backend.auth.exception.UserNotFoundException;
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
    public UserDto createUserDto(UserCreationDto userCreationDto) {
        User user = this.createUser(userCreationDto);
        return this.mapToDto(user);
    }

    @Override
    public void deleteUserById(long id) {
        if (!this.userRepository.existsById(id)) {
            throw new UserNotFoundException();
        }

        this.userRepository.deleteById(id);
    }

    @Override
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    @Override
    public List<UserDto> getAllUserDtos() {
        List<User> users = this.getAllUsers();

        return users.stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public User updateUserById(long id, UserUpdateDto userUpdateDto) {
        User user = this.userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);

        if (userUpdateDto.getPassword() != null) {
            user.setPassword(this.passwordEncoder.encode(userUpdateDto.getPassword()));
        }

        if (userUpdateDto.getRole() != null) {
            user.setRole(userUpdateDto.getRole());
        }

        return this.userRepository.save(user);
    }

    @Override
    public UserDto updateUserByIdDto(long id, UserUpdateDto userUpdateDto) {
        User user = this.updateUserById(id, userUpdateDto);
        return this.mapToDto(user);
    }

    private void throwIfUserWithUsernameExists(String username) {
        Optional<User> foundUser = this.userRepository.findByUsername(username);

        if (foundUser.isPresent()) {
            throw new UserAlreadyExistsException(username);
        }
    }

    private UserDto mapToDto(User user) {
        return new UserDto(user.getId(), user.getUsername(), user.getRole());
    }

}
