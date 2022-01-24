package dev.zemco.intelligenthome.backend.auth.impl;

import dev.zemco.intelligenthome.backend.auth.User;
import dev.zemco.intelligenthome.backend.auth.UserDetailsFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class UserDetailsFactoryImpl implements UserDetailsFactory {

    @Override
    public UserDetails createUserDetails(User user) {
        return new UserDetailsImpl(user);
    }

}
