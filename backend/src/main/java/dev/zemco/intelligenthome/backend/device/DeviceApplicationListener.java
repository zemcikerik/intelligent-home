package dev.zemco.intelligenthome.backend.device;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DeviceApplicationListener implements ApplicationListener<SessionDisconnectEvent> {

    private final DeviceService deviceService;
    private final RemoteDeviceService remoteDeviceService;

    @Override
    public void onApplicationEvent(SessionDisconnectEvent sessionDisconnectEvent) {
        String sessionId = sessionDisconnectEvent.getSessionId();
        List<RemoteDevice> devices = this.remoteDeviceService.getDevicesBySessionId(sessionId);
        devices.forEach(deviceService::unregisterDevice);
    }

}
