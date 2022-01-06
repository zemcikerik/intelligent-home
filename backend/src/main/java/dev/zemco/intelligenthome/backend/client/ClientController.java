package dev.zemco.intelligenthome.backend.client;

import dev.zemco.intelligenthome.backend.device.Device;
import dev.zemco.intelligenthome.backend.device.DeviceDto;
import dev.zemco.intelligenthome.backend.device.DeviceService;
import dev.zemco.intelligenthome.backend.feature.Feature;
import dev.zemco.intelligenthome.backend.feature.FeatureDto;
import dev.zemco.intelligenthome.backend.feature.FeatureService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// TODO: should this be here?
@RestController
@RequiredArgsConstructor
public class ClientController {

    private final DeviceService deviceService;
    private final FeatureService featureService;

    @GetMapping("/client/current-state")
    public ClientDto getCurrentStateForClient() {
        List<DeviceDto> deviceInfo = this.deviceService.getActiveDevices()
                .stream()
                .map(Device::toDto)
                .toList();

        List<FeatureDto> featureInfo = this.featureService.getAllFeatures()
                .stream()
                .map(Feature::toDto)
                .toList();

        return new ClientDto(deviceInfo, featureInfo);
    }

}
