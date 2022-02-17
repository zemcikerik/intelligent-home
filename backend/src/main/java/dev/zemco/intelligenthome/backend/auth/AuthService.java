package dev.zemco.intelligenthome.backend.auth;

import dev.zemco.intelligenthome.backend.auth.dto.LoginDto;

public interface AuthService {
    String attemptLogin(LoginDto loginDto);
    String attemptRefresh(String refreshToken);
    User getAuthenticatedUser();
}
