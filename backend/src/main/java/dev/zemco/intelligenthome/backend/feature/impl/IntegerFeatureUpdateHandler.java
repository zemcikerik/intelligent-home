package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.Feature;
import dev.zemco.intelligenthome.backend.feature.FeatureService;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateHandler;
import dev.zemco.intelligenthome.backend.feature.state.IntegerFeatureState;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class IntegerFeatureUpdateHandler implements FeatureUpdateHandler {

    private final FeatureService featureService;

    @Override
    public void handleUpdate(Feature feature, Map<String, Object> update) {
        IntegerFeatureState state = (IntegerFeatureState) feature.getState();
        state.setValue((int) update.get("value"));
        this.featureService.updateFeature(feature);
    }

}
