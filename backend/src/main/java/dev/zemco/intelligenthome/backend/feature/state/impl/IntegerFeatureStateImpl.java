package dev.zemco.intelligenthome.backend.feature.state.impl;

import dev.zemco.intelligenthome.backend.feature.state.IntegerFeatureState;

import java.util.Map;

public class IntegerFeatureStateImpl implements IntegerFeatureState {

    private int value;

    @Override
    public void toMap(Map<String, Object> map) {
        map.put("value", this.value);
    }

    @Override
    public int getValue() {
        return this.value;
    }

    @Override
    public void setValue(int value) {
        this.value = value;
    }

}
