package dev.zemco.intelligenthome.backend.device;

import java.util.List;

public interface RemoteDeviceService {
    List<RemoteDevice> getDevicesBySessionId(String sessionId);
}
