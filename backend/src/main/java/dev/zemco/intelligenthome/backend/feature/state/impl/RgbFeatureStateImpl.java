package dev.zemco.intelligenthome.backend.feature.state.impl;

import dev.zemco.intelligenthome.backend.feature.state.RgbFeatureState;

import java.util.Map;

public class RgbFeatureStateImpl implements RgbFeatureState {

    private int r;
    private int g;
    private int b;

    @Override
    public void toMap(Map<String, Object> map) {
        map.put("r", r);
        map.put("g", g);
        map.put("b", b);
    }

    @Override
    public int getR() {
        return r;
    }

    @Override
    public int getG() {
        return g;
    }

    @Override
    public int getB() {
        return b;
    }

    @Override
    public void setValue(int r, int g, int b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}
