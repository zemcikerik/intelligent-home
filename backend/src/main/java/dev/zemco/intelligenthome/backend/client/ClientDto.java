package dev.zemco.intelligenthome.backend.client;

import dev.zemco.intelligenthome.backend.device.DeviceDto;
import dev.zemco.intelligenthome.backend.feature.FeatureDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientDto {
    private List<DeviceDto> devices;
    private List<FeatureDto> features;
}
