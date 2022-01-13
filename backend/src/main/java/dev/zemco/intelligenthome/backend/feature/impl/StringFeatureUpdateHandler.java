package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.Feature;
import dev.zemco.intelligenthome.backend.feature.FeatureService;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateHandler;
import dev.zemco.intelligenthome.backend.feature.state.StringFeatureState;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class StringFeatureUpdateHandler implements FeatureUpdateHandler {

    private final FeatureService featureService;

    @Override
    public void handleUpdate(Feature feature, Map<String, Object> update) {
        StringFeatureState state = (StringFeatureState) feature.getState();
        state.setText((String) update.get("text"));
        this.featureService.updateFeature(feature);
    }

}
