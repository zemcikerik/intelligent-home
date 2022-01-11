package dev.zemco.intelligenthome.backend.feature.state.impl;

import dev.zemco.intelligenthome.backend.feature.state.BooleanFeatureState;

import java.util.Map;

public class BooleanFeatureStateImpl implements BooleanFeatureState {

    private boolean enabled;

    @Override
    public void toMap(Map<String, Object> map) {
        map.put("enabled", this.enabled);
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

    @Override
    public void setEnabled(boolean value) {
        this.enabled = value;
    }

}
