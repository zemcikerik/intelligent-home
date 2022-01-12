package dev.zemco.intelligenthome.backend.feature.state.impl;

import dev.zemco.intelligenthome.backend.feature.state.StringFeatureState;

import java.util.Map;

public class StringFeatureStateImpl implements StringFeatureState {

    private String text;

    @Override
    public void toMap(Map<String, Object> map) {
        map.put("text", this.text);
    }

    @Override
    public String getText() {
        return this.text;
    }

    @Override
    public void setText(String text) {
        this.text = text;
    }
}
