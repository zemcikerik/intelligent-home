package dev.zemco.intelligenthome.backend.auth.impl;

import dev.zemco.intelligenthome.backend.auth.*;
import dev.zemco.intelligenthome.backend.auth.exception.InvalidRefreshTokenException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenEntryRepository refreshTokenEntryRepository;
    private final RefreshTokenGenerator refreshTokenGenerator;

    @Override
    public String createRefreshToken(User user) {
        String token = this.refreshTokenGenerator.generateRefreshToken();

        RefreshTokenEntry entry = new RefreshTokenEntry();
        entry.setToken(token);
        entry.setUser(user);
        entry.setUserId(user.getId());

        entry = this.refreshTokenEntryRepository.save(entry);
        return entry.getToken();
    }

    @Override
    public User useRefreshToken(String token) {
        RefreshTokenEntry entry = this.refreshTokenEntryRepository.findByToken(token)
                .orElseThrow(InvalidRefreshTokenException::new);

        this.refreshTokenEntryRepository.delete(entry);
        return entry.getUser();
    }

}
