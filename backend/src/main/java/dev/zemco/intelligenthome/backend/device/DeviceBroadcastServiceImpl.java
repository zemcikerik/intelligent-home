package dev.zemco.intelligenthome.backend.device;

import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DeviceBroadcastServiceImpl implements DeviceBroadcastService {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public void broadcastDeviceAddition(Device device) {
        this.simpMessagingTemplate.convertAndSend("/device/add", device.toDto());
    }

    @Override
    public void broadcastDeviceUpdate(Device device) {
        this.simpMessagingTemplate.convertAndSend("/device/update", device.toDto());
    }

    @Override
    public void broadcastDeviceRemoval(Device device) {
        this.simpMessagingTemplate.convertAndSend("/device/remove", device.getId());
    }

}
