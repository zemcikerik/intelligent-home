package dev.zemco.intelligenthome.backend.device;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class DeviceDto {
    private UUID id;
    private String name;
}
