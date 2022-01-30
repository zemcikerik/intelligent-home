package dev.zemco.intelligenthome.backend.auth;

import java.security.Key;

public interface JwtKeyService {
    Key getSigningKey();
}
