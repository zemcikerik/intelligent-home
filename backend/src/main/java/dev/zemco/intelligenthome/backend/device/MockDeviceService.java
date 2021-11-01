package dev.zemco.intelligenthome.backend.device;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MockDeviceService implements DeviceService {

    private static final List<Device> MOCK_DEVICES = List.of();

    @Override
    public List<Device> getActiveDevices() {
        return MOCK_DEVICES;
    }

}
