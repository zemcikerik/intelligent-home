package dev.zemco.intelligenthome.backend.device;

import org.springframework.messaging.simp.SimpAttributesContextHolder;

public interface RemoteDeviceFactory {
    RemoteDevice createRemoteDevice(DeviceDto deviceDto, String sessionId);

    default RemoteDevice createRemoteDevice(DeviceDto deviceDto) {
        String sessionId = SimpAttributesContextHolder.currentAttributes().getSessionId();
        return this.createRemoteDevice(deviceDto, sessionId);
    }
}
