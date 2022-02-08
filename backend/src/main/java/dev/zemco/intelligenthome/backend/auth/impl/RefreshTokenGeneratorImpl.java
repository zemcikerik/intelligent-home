package dev.zemco.intelligenthome.backend.auth.impl;

import dev.zemco.intelligenthome.backend.auth.RefreshTokenGenerator;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class RefreshTokenGeneratorImpl implements RefreshTokenGenerator {

    private final SecureRandom rng = new SecureRandom();
    private final AtomicInteger generationCount = new AtomicInteger();

    @Override
    public String generateRefreshToken() {
        // we need 32 characters
        // https://stackoverflow.com/a/17864767
        byte[] bytes = new byte[24];
        this.rng.nextBytes(bytes);

        // reseed after 5 generated tokens
        if (this.generationCount.incrementAndGet() == 5) {
            this.rng.reseed();
            this.generationCount.set(0);
        }

        return Base64.getEncoder().encodeToString(bytes);
    }

}
