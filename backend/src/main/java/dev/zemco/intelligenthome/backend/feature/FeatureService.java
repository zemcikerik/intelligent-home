package dev.zemco.intelligenthome.backend.feature;

public interface FeatureService {
    void registerFeature(Feature feature);
    void unregisterFeature(Feature feature);
}
