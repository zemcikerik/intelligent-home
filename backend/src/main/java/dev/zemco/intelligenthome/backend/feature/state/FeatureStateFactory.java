package dev.zemco.intelligenthome.backend.feature.state;

import dev.zemco.intelligenthome.backend.feature.FeatureType;

public interface FeatureStateFactory {
    FeatureState createFeatureState(FeatureType featureType);
}
