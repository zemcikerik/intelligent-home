package dev.zemco.intelligenthome.backend.feature;

import java.util.Map;
import java.util.UUID;

public interface FeatureUpdateService {
    void handleFeatureUpdate(UUID featureId, Map<String, Object> update);
    void handleFeatureUpdateRequest(UUID featureId, Map<String, Object> update);
    void handleFeatureUpdate(Feature feature, Map<String, Object> update, Class<? extends FeatureUpdateHandler> updateHandlerClass);
}
