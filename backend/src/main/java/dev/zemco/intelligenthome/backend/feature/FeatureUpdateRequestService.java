package dev.zemco.intelligenthome.backend.feature;

import java.util.Map;
import java.util.UUID;

public interface FeatureUpdateRequestService {
    void handleFeatureUpdateRequest(UUID featureId, Map<String, String> update);
}
