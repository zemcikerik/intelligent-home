package dev.zemco.intelligenthome.backend.device.impl;

import dev.zemco.intelligenthome.backend.device.RemoteDevice;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class RemoteDeviceImpl implements RemoteDevice {
    private final UUID id;
    private final String name;
    private final String shortDescription;
    private final String sessionId;
}
