package dev.zemco.intelligenthome.backend.auth;

import org.springframework.security.core.Authentication;

public interface JwtService {
    String createJwtForUser(User user);
    Authentication createAuthentication(String jwt);
}
