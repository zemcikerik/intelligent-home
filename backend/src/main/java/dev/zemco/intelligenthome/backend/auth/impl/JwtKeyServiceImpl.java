package dev.zemco.intelligenthome.backend.auth.impl;

import dev.zemco.intelligenthome.backend.auth.JwtKeyService;
import dev.zemco.intelligenthome.backend.auth.config.JwtProperties;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;

@Service
public class JwtKeyServiceImpl implements JwtKeyService {

    private final Key signingKey;

    public JwtKeyServiceImpl(JwtProperties jwtProperties) {
        String signingKey = jwtProperties.getSigningKey();
        byte[] bytes = Decoders.BASE64.decode(signingKey);
        this.signingKey = new SecretKeySpec(bytes, SignatureAlgorithm.HS256.getJcaName());
    }

    @Override
    public Key getSigningKey() {
        return this.signingKey;
    }

}
