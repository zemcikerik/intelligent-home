package dev.zemco.intelligenthome.backend.feature;

import dev.zemco.intelligenthome.backend.feature.state.FeatureState;

import java.util.UUID;

public interface Feature {
    UUID getId();
    UUID getDeviceId();
    String getName();
    FeatureType getType();
    FeatureState getState();

    default FeatureDto toDto() {
        return new FeatureDto(this.getId(), this.getDeviceId(), this.getName(), this.getType(), this.getState().toMap());
    }
}
