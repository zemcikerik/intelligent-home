package dev.zemco.intelligenthome.backend.feature.state;

import java.util.HashMap;
import java.util.Map;

public interface FeatureState {
    void toMap(Map<String, String> map);

    default Map<String, String> toMap() {
        Map<String, String> map = new HashMap<>();
        this.toMap(map);
        return map;
    }
}
