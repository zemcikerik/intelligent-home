package dev.zemco.intelligenthome.backend.auth;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenEntryRepository extends JpaRepository<RefreshTokenEntry, Long> {
    Optional<RefreshTokenEntry> findByToken(String token);
}
