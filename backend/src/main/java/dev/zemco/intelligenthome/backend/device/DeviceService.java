package dev.zemco.intelligenthome.backend.device;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DeviceService {
    Optional<Device> getDeviceById(UUID id);
    List<Device> getActiveDevices();

    void registerDevice(Device device);
    void unregisterDevice(Device device);
}
