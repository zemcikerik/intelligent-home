package dev.zemco.intelligenthome.backend.auth;

import dev.zemco.intelligenthome.backend.auth.exception.UserAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/user")
    public ResponseEntity<?> createUser(@RequestBody @NotNull @Valid UserCreationDto userCreationDto) {
        try {
            this.userService.createUser(userCreationDto);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

}
