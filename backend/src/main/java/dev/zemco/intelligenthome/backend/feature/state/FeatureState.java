package dev.zemco.intelligenthome.backend.feature.state;

import java.util.HashMap;
import java.util.Map;

public interface FeatureState {
    void toMap(Map<String, Object> map);

    default Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        this.toMap(map);
        return map;
    }
}
