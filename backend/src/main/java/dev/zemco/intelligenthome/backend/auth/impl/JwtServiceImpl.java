package dev.zemco.intelligenthome.backend.auth.impl;

import dev.zemco.intelligenthome.backend.auth.JwtKeyService;
import dev.zemco.intelligenthome.backend.auth.JwtService;
import dev.zemco.intelligenthome.backend.auth.User;
import dev.zemco.intelligenthome.backend.auth.config.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {

    private final JwtProperties jwtProperties;
    private final JwtKeyService jwtKeyService;
    private final UserDetailsService userDetailsService;

    @Override
    public String createJwtForUser(User user) {
        return Jwts.builder()
                .signWith(this.jwtKeyService.getSigningKey())
                .setIssuer(this.jwtProperties.getIssuer())
                .setSubject(user.getUsername())
                .setExpiration(this.createExpirationDate())
                .claim(this.jwtProperties.getClaimNames().getAuthorities(), this.getClaimAuthorities(user))
                .compact();
    }

    @Override
    public Authentication createAuthentication(String jwt) {
        Jws<Claims> jws = Jwts.parserBuilder()
                .setSigningKey(this.jwtKeyService.getSigningKey())
                .requireIssuer(this.jwtProperties.getIssuer())
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
        LocalDateTime time = LocalDateTime.now().plusHours(this.jwtProperties.getExpirationHours());
        Instant instant = time.atZone(ZoneId.systemDefault()).toInstant();
        return Date.from(instant);
    }

}
