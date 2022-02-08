package dev.zemco.intelligenthome.backend.auth.impl;

import dev.zemco.intelligenthome.backend.auth.RefreshTokenGenerator;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Base64;

@Component
public class RefreshTokenGeneratorImpl implements RefreshTokenGenerator {

    @Override
    public String generateRefreshToken() {
        // TODO: reuse SecureRandom
        // TODO: reseeding
        SecureRandom rng = new SecureRandom();

        // we need 32 characters
        // https://stackoverflow.com/a/17864767
        byte[] bytes = new byte[24];
        rng.nextBytes(bytes);

        return Base64.getEncoder().encodeToString(bytes);
    }

}
