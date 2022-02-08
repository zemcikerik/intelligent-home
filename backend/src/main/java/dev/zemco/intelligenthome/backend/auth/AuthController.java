package dev.zemco.intelligenthome.backend.auth;

import dev.zemco.intelligenthome.backend.auth.dto.LoginDto;
import dev.zemco.intelligenthome.backend.auth.dto.UserCreationDto;
import dev.zemco.intelligenthome.backend.auth.exception.InvalidRefreshTokenException;
import dev.zemco.intelligenthome.backend.auth.exception.UserAlreadyExistsException;
import dev.zemco.intelligenthome.backend.auth.exception.WrongPasswordException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @NotNull @Valid LoginDto loginDto) {
        try {
            String jwt = this.authService.attemptLogin(loginDto);
            return this.createBearerResponse(jwt);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (WrongPasswordException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody @NotNull String refreshToken) {
        try {
            String jwt = this.authService.attemptRefresh(refreshToken);
            return this.createBearerResponse(jwt);
        } catch (InvalidRefreshTokenException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/user")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createUser(@RequestBody @NotNull @Valid UserCreationDto userCreationDto) {
        try {
            this.userService.createUser(userCreationDto);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    private ResponseEntity<?> createBearerResponse(String jwt) {
        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + jwt)
                .build();
    }

}
