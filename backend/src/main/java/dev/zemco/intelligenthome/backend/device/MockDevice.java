package dev.zemco.intelligenthome.backend.device;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class MockDevice implements Device {
    private final UUID id;
    private final String name;
}
