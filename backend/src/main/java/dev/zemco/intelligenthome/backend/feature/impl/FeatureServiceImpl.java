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
    private final Map<UUID, List<Feature>> deviceIdToFeatures = new HashMap<>();
    private final Map<Feature, UUID> featureToDeviceId = new HashMap<>();
    private final Map<UUID, Feature> featureIdToFeature = new HashMap<>();

    @Override
    public Optional<Feature> getFeatureById(UUID id) {
        return Optional.of(this.featureIdToFeature.get(id));
    }

    @Override
    public List<Feature> getAllFeatures() {
        // TODO: should we also store all features in single list?
        return this.featureIdToFeature.values().stream().toList();
    }

    @Override
    public List<Feature> getFeaturesForDevice(UUID deviceId) {
        return List.copyOf(this.deviceIdToFeatures.get(deviceId));
    }

    @Override
    public void registerFeature(Feature feature) {
        UUID deviceId = feature.getDeviceId();

        List<Feature> features = this.deviceIdToFeatures.computeIfAbsent(deviceId, ignored -> new ArrayList<>());
        features.add(feature);

        this.featureToDeviceId.put(feature, deviceId);
        this.featureIdToFeature.put(feature.getId(), feature);
        this.featureBroadcastService.broadcastFeatureAddition(feature);
    }

    @Override
    public void updateFeature(Feature feature) {
        this.featureBroadcastService.broadcastFeatureUpdate(feature);
    }

    @Override
    public void unregisterFeature(Feature feature) {
        UUID deviceId = this.featureToDeviceId.remove(feature);
        this.featureIdToFeature.remove(feature.getId());

        List<Feature> features = this.deviceIdToFeatures.get(deviceId);
        features.remove(feature);

        if (features.size() == 0) {
            this.deviceIdToFeatures.remove(deviceId);
        }

        this.featureBroadcastService.broadcastFeatureRemoval(feature);
    }

}
