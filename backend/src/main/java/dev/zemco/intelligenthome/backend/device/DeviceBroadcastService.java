package dev.zemco.intelligenthome.backend.device;

// TODO: rename me
public interface DeviceBroadcastService {
    void broadcastDeviceAddition(Device device);
    void broadcastDeviceUpdate(Device device);
    void broadcastDeviceRemoval(Device device);
}
