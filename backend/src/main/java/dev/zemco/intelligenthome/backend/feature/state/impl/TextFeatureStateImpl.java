package dev.zemco.intelligenthome.backend.feature.state.impl;

import dev.zemco.intelligenthome.backend.feature.state.TextFeatureState;

import java.util.Map;

public class TextFeatureStateImpl implements TextFeatureState {

    private String text;

    @Override
    public void toMap(Map<String, Object> map) {
        map.put("text", text);
    }

    @Override
    public String getText() {
        return text;
    }

    @Override
    public void setText(String text) {
        this.text = text;
    }

}
