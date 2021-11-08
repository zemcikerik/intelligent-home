package dev.zemco.intelligenthome.backend.device;

import java.util.UUID;

public interface Device {
    UUID getId();
    String getName();

    // TODO: should we move this?
    default DeviceDto toDto() {
        return new DeviceDto(this.getId(), this.getName());
    }
}
