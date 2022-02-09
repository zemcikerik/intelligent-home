package dev.zemco.intelligenthome.backend.auth.impl;

import dev.zemco.intelligenthome.backend.auth.*;
import dev.zemco.intelligenthome.backend.auth.dto.LoginDto;
import dev.zemco.intelligenthome.backend.auth.exception.WrongPasswordException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    @Override
    public String attemptLogin(LoginDto loginDto) {
        Optional<User> foundUser = this.userService.getUserByUsername(loginDto.getUsername());

        if (foundUser.isEmpty()) {
            throw new UsernameNotFoundException(loginDto.getUsername());
        }

        User user = foundUser.get();
        String encodedPassword = user.getPassword();

        if (!this.passwordEncoder.matches(loginDto.getPassword(), encodedPassword)) {
            throw new WrongPasswordException();
        }

        return this.jwtService.createJwtForUser(user);
    }

    @Override
    @Transactional
    public String attemptRefresh(String refreshToken) {
        User user = this.refreshTokenService.useRefreshToken(refreshToken);
        return this.jwtService.createJwtForUser(user);
    }

    @Override
    public User getAuthenticatedUser() {
        Object principal = SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        return ((WrappingUserDetails) principal).getUser();
    }

}
