package dev.zemco.intelligenthome.backend.feature;

public interface Feature {
    String getName();
    FeatureType getType();
    Object getState();
}
