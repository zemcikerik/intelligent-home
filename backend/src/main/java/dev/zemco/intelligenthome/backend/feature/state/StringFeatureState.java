package dev.zemco.intelligenthome.backend.feature.state;

public interface StringFeatureState extends FeatureState {
    String getText();
    void setText(String text);
}
