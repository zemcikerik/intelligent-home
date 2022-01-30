package dev.zemco.intelligenthome.backend.auth;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

public enum Role {
    USER("ROLE_USER"),
    ADMIN("ROLE_USER", "ROLE_ADMIN");

    private final Collection<? extends GrantedAuthority> authorities;

    Role(String... authorities) {
        this.authorities = Arrays.stream(authorities)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toUnmodifiableSet());
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

}
