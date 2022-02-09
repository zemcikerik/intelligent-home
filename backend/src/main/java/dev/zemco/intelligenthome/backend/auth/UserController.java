package dev.zemco.intelligenthome.backend.auth;

import dev.zemco.intelligenthome.backend.auth.dto.UserCreateDto;
import dev.zemco.intelligenthome.backend.auth.dto.UserDto;
import dev.zemco.intelligenthome.backend.auth.dto.UserUpdateDto;
import dev.zemco.intelligenthome.backend.auth.exception.UserAlreadyExistsException;
import dev.zemco.intelligenthome.backend.auth.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequestMapping("/user")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserDto> getUsers() {
        return this.userService.getAllUserDtos();
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody @NotNull @Valid UserCreateDto userCreateDto) {
        try {
            UserDto user = this.userService.createUserDto(userCreateDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable long id,
            @RequestBody @NotNull @Valid UserUpdateDto userUpdateDto
    ) {
        try {
            UserDto user = this.userService.updateUserByIdDto(id, userUpdateDto);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteUser(@PathVariable long id) {
        try {
            this.userService.deleteUserById(id);
            return ResponseEntity.noContent().build();
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
