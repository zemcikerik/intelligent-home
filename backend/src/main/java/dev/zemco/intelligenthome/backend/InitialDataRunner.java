package dev.zemco.intelligenthome.backend;

import dev.zemco.intelligenthome.backend.auth.Role;
import dev.zemco.intelligenthome.backend.auth.dto.UserCreationDto;
import dev.zemco.intelligenthome.backend.auth.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
@RequiredArgsConstructor
public class InitialDataRunner implements CommandLineRunner {

    private final UserService userService;

    @Override
    @Transactional
    public void run(String... args) {
        if (this.userService.getAllUsers().size() == 0) {
            this.userService.createUser(new UserCreationDto("user", "password", Role.USER));
            this.userService.createUser(new UserCreationDto("admin", "password", Role.ADMIN));
        }
    }

}
