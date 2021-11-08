package dev.zemco.intelligenthome.backend.feature;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class FeatureServiceImpl implements FeatureService {

    private final Map<UUID, List<Feature>> deviceIdToFeatures = new HashMap<>();
    private final Map<Feature, UUID> featureToDeviceId = new HashMap<>();

    @Override
    public void registerFeature(Feature feature) {
        UUID deviceId = feature.getDeviceId();
        List<Feature> features = this.deviceIdToFeatures.computeIfAbsent(deviceId, ignored -> new ArrayList<>());

        features.add(feature);
        this.featureToDeviceId.put(feature, deviceId);
    }

    @Override
    public void unregisterFeature(Feature feature) {
        UUID deviceId = this.featureToDeviceId.remove(feature);

        List<Feature> features = this.deviceIdToFeatures.get(deviceId);
        features.remove(feature);

        if (features.size() == 0) {
            this.deviceIdToFeatures.remove(deviceId);
        }
    }

}
