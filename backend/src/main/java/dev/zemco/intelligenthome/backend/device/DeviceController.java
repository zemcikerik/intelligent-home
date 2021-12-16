package dev.zemco.intelligenthome.backend.device;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class DeviceController {

    private final DeviceAdditionRequestService service;

    @PostMapping("/device/request-add/")
    public void requestDeviceAddition(@RequestParam String requestId) {
        service.requestAddition(requestId);
    }

    //handle request from device
    @PostMapping("/device/request-add-from-device/")
    public void requestDeviceAdditionFromDevice(@RequestParam String requestId, @RequestBody DeviceDto device) {
        service.requestAdditionFromDevice(requestId, device);
    }
}
