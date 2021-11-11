package dev.zemco.intelligenthome.backend.feature.state;

public interface IntegerFeatureState extends FeatureState {
    int getValue();
    void setValue(int value);
}
