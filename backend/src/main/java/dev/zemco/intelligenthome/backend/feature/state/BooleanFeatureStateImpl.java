package dev.zemco.intelligenthome.backend.feature.state;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class BooleanFeatureStateImpl implements BooleanFeatureState {

    private boolean enabled;

    @Override
    public void toMap(Map<String, String> map) {
        map.put("enabled", String.valueOf(this.enabled));
    }

}
