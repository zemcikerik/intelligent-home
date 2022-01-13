package dev.zemco.intelligenthome.backend.feature.state;

public interface BooleanFeatureState extends FeatureState {
    boolean isEnabled();
    void setEnabled(boolean value);
}
