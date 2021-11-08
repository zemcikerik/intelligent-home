package dev.zemco.intelligenthome.backend.feature;

import dev.zemco.intelligenthome.backend.feature.state.FeatureState;

import java.util.UUID;

public interface Feature {
    UUID getId();
    String getName();
    FeatureType getType();
    FeatureState getState();
}
