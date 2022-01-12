package dev.zemco.intelligenthome.backend.feature.state;

public interface RgbFeatureState extends FeatureState{
    int getR();
    int getG();
    int getB();
    void setValue(int r, int g, int b);
}
