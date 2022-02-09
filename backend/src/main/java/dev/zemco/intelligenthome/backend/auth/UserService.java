package dev.zemco.intelligenthome.backend.auth;

import dev.zemco.intelligenthome.backend.auth.dto.UserCreateDto;
import dev.zemco.intelligenthome.backend.auth.dto.UserDto;
import dev.zemco.intelligenthome.backend.auth.dto.UserUpdateDto;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(UserCreateDto userCreateDto);
    UserDto createUserDto(UserCreateDto userCreateDto);
    void deleteUserById(long id);
    List<User> getAllUsers();
    List<UserDto> getAllUserDtos();
    Optional<User> getUserByUsername(String username);
    User updateUserById(long id, UserUpdateDto userUpdateDto);
    UserDto updateUserByIdDto(long id, UserUpdateDto userUpdateDto);
}
