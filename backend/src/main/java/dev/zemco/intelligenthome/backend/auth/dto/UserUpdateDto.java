package dev.zemco.intelligenthome.backend.auth.dto;

import dev.zemco.intelligenthome.backend.auth.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDto {

    @Size(min = 8)
    private String password;
    private Role role;

}
