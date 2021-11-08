package dev.zemco.intelligenthome.backend.device;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DeviceServiceImpl implements DeviceService {

    private final List<Device> devices = new ArrayList<>();
    private final DeviceBroadcastService deviceBroadcastService;

    public DeviceServiceImpl(DeviceBroadcastService deviceBroadcastService) {
        this.deviceBroadcastService = deviceBroadcastService;
    }

    @Override
    public Optional<Device> getDeviceById(UUID id) {
        return devices.stream()
                .filter(device -> device.getId().equals(id))
                .findAny();
    }

    @Override
    public List<Device> getActiveDevices() {
        return Collections.unmodifiableList(devices);
    }

    @Override
    public void registerDevice(Device device) {
        // should we check if device was already added before?
        this.devices.add(device);
        this.deviceBroadcastService.broadcastDeviceAddition(device);
    }

    @Override
    public void updateDevice(Device device) {
        this.deviceBroadcastService.broadcastDeviceUpdate(device);
    }

    @Override
    public void unregisterDevice(Device device) {
        // should we check if device was added?
        this.devices.remove(device);
        this.deviceBroadcastService.broadcastDeviceRemoval(device);
    }

}
