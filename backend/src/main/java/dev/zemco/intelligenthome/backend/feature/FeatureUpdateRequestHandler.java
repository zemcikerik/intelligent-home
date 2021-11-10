package dev.zemco.intelligenthome.backend.feature;

import java.util.Map;

// TODO: is this really the best solution?
public interface FeatureUpdateRequestHandler {
    void handleUpdateRequest(Feature feature, Map<String, String> update);
}
