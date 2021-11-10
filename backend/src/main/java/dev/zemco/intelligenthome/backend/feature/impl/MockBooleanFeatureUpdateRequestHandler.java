package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.Feature;
import dev.zemco.intelligenthome.backend.feature.FeatureService;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateRequestHandler;
import dev.zemco.intelligenthome.backend.feature.state.BooleanFeatureState;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@AllArgsConstructor
public class MockBooleanFeatureUpdateRequestHandler implements FeatureUpdateRequestHandler {

    private final FeatureService featureService;

    @Override
    public void handleUpdateRequest(Feature feature, Map<String, String> update) {
        BooleanFeatureState state = (BooleanFeatureState) feature.getState();
        state.setEnabled(Boolean.parseBoolean(update.get("enabled")));
        this.featureService.updateFeature(feature);
    }

}
