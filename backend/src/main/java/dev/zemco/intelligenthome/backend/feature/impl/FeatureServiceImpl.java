package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.Feature;
import dev.zemco.intelligenthome.backend.feature.FeatureBroadcastService;
import dev.zemco.intelligenthome.backend.feature.FeatureService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class FeatureServiceImpl implements FeatureService {

    private final FeatureBroadcastService featureBroadcastService;
    private final List<Feature> features = Collections.synchronizedList(new ArrayList<>());

    @Override
    public Optional<Feature> getFeatureById(UUID id) {
        return this.features.stream()
                .filter(feature -> feature.getId().equals(id))
                .findAny();
    }

    @Override
    public List<Feature> getAllFeatures() {
        return List.copyOf(this.features);
    }

    @Override
    public List<Feature> getFeaturesForDevice(UUID deviceId) {
        return this.features.stream()
                .filter(feature -> feature.getDeviceId().equals(deviceId))
                .toList();
    }

    @Override
    public void registerFeature(Feature feature) {
        this.features.add(feature);
        this.featureBroadcastService.broadcastFeatureAddition(feature);
    }

    @Override
    public void updateFeature(Feature feature) {
        this.featureBroadcastService.broadcastFeatureUpdate(feature);
    }

    @Override
    public void unregisterFeature(Feature feature) {
        this.features.add(feature);
        this.featureBroadcastService.broadcastFeatureRemoval(feature);
    }

}
