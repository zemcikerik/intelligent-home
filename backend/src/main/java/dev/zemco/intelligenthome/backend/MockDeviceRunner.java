package dev.zemco.intelligenthome.backend;

import dev.zemco.intelligenthome.backend.device.Device;
import dev.zemco.intelligenthome.backend.device.DeviceService;
import dev.zemco.intelligenthome.backend.device.MockDevice;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Random;
import java.util.UUID;

@Component
@AllArgsConstructor
@EnableScheduling
public class MockDeviceRunner {

    private final DeviceService deviceService;

    @Scheduled(fixedRate = 2000L)
    public void add() {
        this.deviceService.registerDevice(new MockDevice(UUID.randomUUID(), "Test Device"));
    }

    @Scheduled(fixedRate = 3000L)
    public void remove() {
        List<Device> devices = this.deviceService.getActiveDevices();

        if (devices.size() == 0) {
            return;
        }

        Random rng = new Random();
        Device device = devices.get(rng.nextInt(devices.size()));
        this.deviceService.unregisterDevice(device);
    }

}
