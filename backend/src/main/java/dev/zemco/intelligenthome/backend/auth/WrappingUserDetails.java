package dev.zemco.intelligenthome.backend.auth;

import org.springframework.security.core.userdetails.UserDetails;

public interface WrappingUserDetails extends UserDetails {
    User getUser();
}
