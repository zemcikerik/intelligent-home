package dev.zemco.intelligenthome.backend.device.impl;

import dev.zemco.intelligenthome.backend.device.DeviceDto;
import dev.zemco.intelligenthome.backend.device.RemoteDevice;
import dev.zemco.intelligenthome.backend.device.RemoteDeviceFactory;
import org.springframework.stereotype.Component;

@Component
public class RemoteDeviceFactoryImpl implements RemoteDeviceFactory {

    @Override
    public RemoteDevice createRemoteDevice(DeviceDto deviceDto, String sessionId) {
        return new RemoteDeviceImpl(deviceDto.getId(), deviceDto.getName(), sessionId);
    }

}
