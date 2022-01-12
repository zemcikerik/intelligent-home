package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.Feature;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateHandler;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class IgnoreFeatureUpdateHandler implements FeatureUpdateHandler {

    @Override
    public void handleUpdate(Feature feature, Map<String, Object> update) {
    }

}
