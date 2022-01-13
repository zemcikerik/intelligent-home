package dev.zemco.intelligenthome.backend.feature;

public interface FeatureUpdateHandlerClassProvider {
    Class<? extends FeatureUpdateHandler> getFeatureUpdateHandlerClass(FeatureType type);
}
