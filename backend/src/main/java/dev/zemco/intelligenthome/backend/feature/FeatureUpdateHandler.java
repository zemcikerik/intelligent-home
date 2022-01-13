package dev.zemco.intelligenthome.backend.feature;

import java.util.Map;

public interface FeatureUpdateHandler {
    void handleUpdate(Feature feature, Map<String, Object> update);
}
