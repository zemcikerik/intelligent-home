package dev.zemco.intelligenthome.backend.feature.state.impl;

import dev.zemco.intelligenthome.backend.feature.state.IntegerFeatureState;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class IntegerFeatureStateImpl implements IntegerFeatureState {

    private int value;

    @Override
    public void toMap(Map<String, Object> map) {
        map.put("value", this.value);
    }

}
