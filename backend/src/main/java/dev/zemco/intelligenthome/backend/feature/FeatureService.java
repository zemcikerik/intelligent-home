package dev.zemco.intelligenthome.backend.feature;

import java.util.List;
import java.util.UUID;

public interface FeatureService {
    List<Feature> getFeaturesForDevice(UUID deviceId);

    void registerFeature(Feature feature);
    void updateFeature(Feature feature);
    void unregisterFeature(Feature feature);
}
