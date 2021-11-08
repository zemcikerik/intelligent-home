package dev.zemco.intelligenthome.backend.device;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@AllArgsConstructor
public class DeviceController {

    private final DeviceService deviceService;

    @GetMapping("/devices")
    public List<DeviceDto> getDevices() {
        return this.deviceService.getActiveDevices()
                .stream()
                .map(DeviceController::toDto)
                .toList();
    }

    private static DeviceDto toDto(Device device) {
        DeviceDto dto = new DeviceDto();
        dto.setId(device.getId());
        dto.setName(device.getName());
        return dto;
    }

}
