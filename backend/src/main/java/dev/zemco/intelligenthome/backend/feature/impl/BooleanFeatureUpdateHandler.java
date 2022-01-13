package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.Feature;
import dev.zemco.intelligenthome.backend.feature.FeatureService;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateHandler;
import dev.zemco.intelligenthome.backend.feature.state.BooleanFeatureState;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class BooleanFeatureUpdateHandler implements FeatureUpdateHandler {

    private final FeatureService featureService;

    @Override
    public void handleUpdate(Feature feature, Map<String, Object> update) {
        BooleanFeatureState state = (BooleanFeatureState) feature.getState();
        state.setEnabled((boolean) update.get("enabled"));
        this.featureService.updateFeature(feature);
    }

}
