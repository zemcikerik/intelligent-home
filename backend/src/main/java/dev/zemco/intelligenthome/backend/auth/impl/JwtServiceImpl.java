package dev.zemco.intelligenthome.backend.auth.impl;

import dev.zemco.intelligenthome.backend.auth.JwtService;
import dev.zemco.intelligenthome.backend.auth.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {

    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.authorities-claim-name}")
    private String authoritiesName;

    @Value("${jwt.expiration.hours}")
    private int expirationHours;

    // TODO: non-random signing key
    private final Key signingKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final UserDetailsService userDetailsService;

    @Override
    public String createJwtForUser(User user) {
        return Jwts.builder()
                .signWith(this.signingKey)
                .setIssuer(this.issuer)
                .setSubject(user.getUsername())
                .setExpiration(this.createExpirationDate())
                .claim(this.authoritiesName, this.getClaimAuthorities(user))
                .compact();
    }

    @Override
    public Authentication createAuthentication(String jwt) {
        Jws<Claims> jws = Jwts.parserBuilder()
                .setSigningKey(this.signingKey)
                .requireIssuer(this.issuer)
                .build()
                .parseClaimsJws(jwt);

        Claims claims = jws.getBody();
        String username = claims.getSubject();
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    private Collection<String> getClaimAuthorities(User user) {
        return user.getRole().getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());
    }

    private Date createExpirationDate() {
        LocalDateTime time = LocalDateTime.now().plusHours(this.expirationHours);
        Instant instant = time.atZone(ZoneId.systemDefault()).toInstant();
        return Date.from(instant);
    }

}
