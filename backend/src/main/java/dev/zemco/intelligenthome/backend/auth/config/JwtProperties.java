package dev.zemco.intelligenthome.backend.auth.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Configuration
@ConfigurationProperties("jwt")
public class JwtProperties {

    @NotEmpty
    private String issuer = "IntelligentHome";

    @Min(1)
    private int expirationHours = 48;

    @NotNull
    private ClaimNames claimNames = new ClaimNames();

    @NotEmpty
    private String signingKey = null;

    @Getter
    @Setter
    public static class ClaimNames {

        @NotEmpty
        private String authorities = "authorities";

        @NotEmpty
        private String refreshToken = "refresh_token";

    }

}
