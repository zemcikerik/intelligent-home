package dev.zemco.intelligenthome.backend.device.impl;

import dev.zemco.intelligenthome.backend.device.Device;
import dev.zemco.intelligenthome.backend.device.DeviceAdditionRequestService;
import dev.zemco.intelligenthome.backend.device.DeviceDto;
import dev.zemco.intelligenthome.backend.device.DeviceService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@AllArgsConstructor
public class DeviceAdditionRequestServiceImpl implements DeviceAdditionRequestService {

    private final DeviceService service;

    //TODO: invalidate request after some time
    private final List<String> requestList = new ArrayList<>();

    @Override
    public void requestAddition(String requestId) {
        requestList.add(requestId);
    }

    @Override
    public void requestAdditionFromDevice(String requestId, DeviceDto device) {
        if (requestList.contains(requestId)) {
            //TODO: confirmation from user
            service.registerDevice(new MockDevice(device.getId(), device.getName()));
            requestList.remove(requestId);
        }
        else throw new ResponseStatusException(NOT_FOUND, "There is no active request with that id!");
    }
}
