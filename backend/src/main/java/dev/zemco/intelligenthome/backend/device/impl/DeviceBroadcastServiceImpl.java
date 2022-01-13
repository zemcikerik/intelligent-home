package dev.zemco.intelligenthome.backend.device.impl;

import dev.zemco.intelligenthome.backend.device.Device;
import dev.zemco.intelligenthome.backend.device.DeviceBroadcastService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DeviceBroadcastServiceImpl implements DeviceBroadcastService {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public void broadcastDeviceAddition(Device device) {
        this.simpMessagingTemplate.convertAndSend("/topic/client/device/add", device.toDto());
    }

    @Override
    public void broadcastDeviceRemoval(Device device) {
        this.simpMessagingTemplate.convertAndSend("/topic/client/device/remove", device.getId());
    }

}
