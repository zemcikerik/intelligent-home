package dev.zemco.intelligenthome.backend.device;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class DeviceController {

    private final DeviceService deviceService;
    private final RemoteDeviceFactory remoteDeviceFactory;

    @MessageMapping("/device/register")
    public void registerDevice(@Payload DeviceDto deviceDto) {
        RemoteDevice device = this.remoteDeviceFactory.createRemoteDevice(deviceDto);
        this.deviceService.registerDevice(device);
    }

    @MessageMapping("/device/unregister/{id}")
    public void unregisterDevice(@DestinationVariable UUID id) {
        this.deviceService.getDeviceById(id).ifPresent(this.deviceService::unregisterDevice);
    }

}
