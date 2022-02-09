package dev.zemco.intelligenthome.backend.auth;

import dev.zemco.intelligenthome.backend.auth.dto.LoginDto;
import dev.zemco.intelligenthome.backend.auth.exception.InvalidRefreshTokenException;
import dev.zemco.intelligenthome.backend.auth.exception.WrongPasswordException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    private ResponseEntity<?> createBearerResponse(String jwt) {
        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + jwt)
                .build();
    }

}
