package dev.zemco.intelligenthome.backend.feature;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FeatureService {
    Optional<Feature> getFeatureById(UUID id);
    List<Feature> getAllFeatures();
    List<Feature> getFeaturesForDevice(UUID deviceId);

    void registerFeature(Feature feature);
    void updateFeature(Feature feature);
    void unregisterFeature(Feature feature);
}
