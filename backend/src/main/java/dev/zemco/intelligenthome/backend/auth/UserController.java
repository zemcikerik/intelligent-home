package dev.zemco.intelligenthome.backend.auth;

import dev.zemco.intelligenthome.backend.auth.dto.UserCreationDto;
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
    public ResponseEntity<?> createUser(@RequestBody @NotNull @Valid UserCreationDto userCreationDto) {
        try {
            this.userService.createUser(userCreationDto);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable long id,
            @RequestBody @NotNull @Valid UserUpdateDto userUpdateDto
    ) {
        try {
            this.userService.updateUserById(id, userUpdateDto);
            return ResponseEntity.noContent().build();
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
