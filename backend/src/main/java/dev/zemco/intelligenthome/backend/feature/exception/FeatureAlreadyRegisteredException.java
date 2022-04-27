package dev.zemco.intelligenthome.backend.feature.exception;

public class FeatureAlreadyRegisteredException extends RuntimeException {

    public FeatureAlreadyRegisteredException() {
    }

    public FeatureAlreadyRegisteredException(String message) {
        super(message);
    }

}
