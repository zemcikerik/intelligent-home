package dev.zemco.intelligenthome.backend.auth;

import org.springframework.security.core.userdetails.UserDetails;

public interface UserDetailsFactory {
    UserDetails createUserDetails(User user);
}
