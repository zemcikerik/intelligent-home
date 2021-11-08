package dev.zemco.intelligenthome.backend.feature.state;

public interface ValueFeatureState extends FeatureState {
    double getValue();
    void setValue(double value);
}
