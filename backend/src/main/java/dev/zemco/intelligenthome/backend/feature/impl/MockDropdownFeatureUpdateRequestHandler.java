package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.Feature;
import dev.zemco.intelligenthome.backend.feature.FeatureService;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateRequestHandler;
import dev.zemco.intelligenthome.backend.feature.state.DropdownFeatureState;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class MockDropdownFeatureUpdateRequestHandler implements FeatureUpdateRequestHandler {

    private final FeatureService featureService;

    @Override
    public void handleUpdateRequest(Feature feature, Map<String, String> update) {
        DropdownFeatureState state = (DropdownFeatureState) feature.getState();
        String selection = update.keySet().iterator().next();
        state.setSelected(selection);
        this.featureService.updateFeature(feature);
    }

}
