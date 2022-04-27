package dev.zemco.intelligenthome.backend.device.exception;

public class DeviceAlreadyRegisteredException extends RuntimeException {

    public DeviceAlreadyRegisteredException() {
    }

    public DeviceAlreadyRegisteredException(String message) {
        super(message);
    }

}
