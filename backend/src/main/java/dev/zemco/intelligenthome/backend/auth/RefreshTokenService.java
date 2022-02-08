package dev.zemco.intelligenthome.backend.auth;

public interface RefreshTokenService {
    String createRefreshToken(User user);
    User useRefreshToken(String token);
}
