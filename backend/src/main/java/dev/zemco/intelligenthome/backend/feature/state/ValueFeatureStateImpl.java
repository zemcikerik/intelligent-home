package dev.zemco.intelligenthome.backend.feature.state;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class ValueFeatureStateImpl implements ValueFeatureState {

    private double value;

    @Override
    public void toMap(Map<String, String> map) {
        map.put("value", String.valueOf(this.value));
    }

}