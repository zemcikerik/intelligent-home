package dev.zemco.intelligenthome.backend.device;

public interface DeviceBroadcastService {
    void broadcastDeviceAddition(Device device);
    void broadcastDeviceRemoval(Device device);
}
