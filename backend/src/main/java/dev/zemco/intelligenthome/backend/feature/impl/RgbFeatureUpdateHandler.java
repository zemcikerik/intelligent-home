package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.Feature;
import dev.zemco.intelligenthome.backend.feature.FeatureService;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateHandler;
import dev.zemco.intelligenthome.backend.feature.state.RgbFeatureState;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class RgbFeatureUpdateHandler implements FeatureUpdateHandler {

    private final FeatureService featureService;

    @Override
    public void handleUpdate(Feature feature, Map<String, Object> update) {
        RgbFeatureState state = (RgbFeatureState) feature.getState();
        state.setValue((int) update.get("r"),(int) update.get("g"),(int) update.get("b"));
        this.featureService.updateFeature(feature);
    }
}
