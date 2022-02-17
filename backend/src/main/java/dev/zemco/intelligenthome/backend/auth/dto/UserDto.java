package dev.zemco.intelligenthome.backend.auth.dto;

import dev.zemco.intelligenthome.backend.auth.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private long id;
    private String username;
    private Role role;
}
