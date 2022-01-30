package dev.zemco.intelligenthome.backend.auth.impl;

import dev.zemco.intelligenthome.backend.auth.JwtKeyService;
import dev.zemco.intelligenthome.backend.auth.config.JwtProperties;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;

@Service
@Slf4j
public class JwtKeyServiceImpl implements JwtKeyService {

    private final Key signingKey;

    public JwtKeyServiceImpl(JwtProperties jwtProperties) {
        String signingKey = jwtProperties.getSigningKey();

        this.signingKey = signingKey != null
                ? this.decodeKey(signingKey)
                : this.generateKey();
    }

    @Override
    public Key getSigningKey() {
        return this.signingKey;
    }

    private Key decodeKey(String rawSigningKey) {
        byte[] bytes = Decoders.BASE64.decode(rawSigningKey);
        return new SecretKeySpec(bytes, SignatureAlgorithm.HS256.getJcaName());
    }

    private Key generateKey() {
        log.warn("Generating signing key because none was provided!");
        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

        String encodedKey = Encoders.BASE64.encode(key.getEncoded());
        log.info("Using generated key: {}", encodedKey);

        return key;
    }

}
