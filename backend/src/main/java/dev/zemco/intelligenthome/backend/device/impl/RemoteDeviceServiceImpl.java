package dev.zemco.intelligenthome.backend.device.impl;

import dev.zemco.intelligenthome.backend.device.DeviceService;
import dev.zemco.intelligenthome.backend.device.RemoteDevice;
import dev.zemco.intelligenthome.backend.device.RemoteDeviceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RemoteDeviceServiceImpl implements RemoteDeviceService {

    private final DeviceService deviceService;

    @Override
    public List<RemoteDevice> getDevicesBySessionId(String sessionId) {
        return this.deviceService.getActiveDevices().stream()
                .filter(device -> device instanceof RemoteDevice)
                .map(device -> (RemoteDevice) device)
                .filter(device -> device.getSessionId().equals(sessionId))
                .toList();
    }

}
