package dev.zemco.intelligenthome.backend.feature;

public interface FeatureBroadcastService {
    void broadcastFeatureAddition(Feature feature);
    void broadcastFeatureRemoval(Feature feature);
}
