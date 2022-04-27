package dev.zemco.intelligenthome.backend.device.impl;

import dev.zemco.intelligenthome.backend.device.Device;
import dev.zemco.intelligenthome.backend.device.DeviceBroadcastService;
import dev.zemco.intelligenthome.backend.device.DeviceService;
import dev.zemco.intelligenthome.backend.device.exception.DeviceAlreadyRegisteredException;
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
        if (this.isDeviceAlreadyRegistered(device)) {
            throw new DeviceAlreadyRegisteredException();
        }

        this.devices.add(device);
        this.deviceBroadcastService.broadcastDeviceAddition(device);
    }

    @Override
    public void unregisterDevice(Device device) {
        this.devices.remove(device);
        this.deviceBroadcastService.broadcastDeviceRemoval(device);
    }

    private boolean isDeviceAlreadyRegistered(Device device) {
        return this.devices.stream().anyMatch(d -> d.getId().equals(device.getId()));
    }

}
