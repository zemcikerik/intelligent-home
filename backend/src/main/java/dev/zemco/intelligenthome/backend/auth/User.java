package dev.zemco.intelligenthome.backend.auth;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotEmpty
    @Size(min = 4, max = 32)
    private String username;

    @NotEmpty
    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;

}
