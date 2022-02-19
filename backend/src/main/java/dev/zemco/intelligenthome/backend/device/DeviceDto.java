package dev.zemco.intelligenthome.backend.device;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeviceDto {
    private UUID id;
    private String name;
    private String shortDescription;
}
