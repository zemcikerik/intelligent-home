package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.Feature;
import dev.zemco.intelligenthome.backend.feature.FeatureService;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateHandler;
import dev.zemco.intelligenthome.backend.feature.state.DropdownFeatureState;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class DropdownFeatureUpdateHandler implements FeatureUpdateHandler {

    private final FeatureService featureService;

    @Override
    public void handleUpdate(Feature feature, Map<String, Object> update) {
        DropdownFeatureState state = (DropdownFeatureState) feature.getState();

        @SuppressWarnings("unchecked")
        List<String> choices = (List<String>) update.get("choices");
        state.setSelected((String) update.get("selected"));

        if (choices != null) {
            state.setChoices(choices);
        }

        this.featureService.updateFeature(feature);
    }

}
