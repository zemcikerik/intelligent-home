package dev.zemco.intelligenthome.backend.device;

public interface DeviceAdditionRequestService {
    void requestAddition(String requestId);
    void requestAdditionFromDevice(String requestId, DeviceDto device);
}
