package dev.zemco.intelligenthome.backend.feature.state.impl;

import dev.zemco.intelligenthome.backend.feature.FeatureType;
import dev.zemco.intelligenthome.backend.feature.state.FeatureState;
import dev.zemco.intelligenthome.backend.feature.state.FeatureStateFactory;
import org.springframework.stereotype.Component;

@Component
public class FeatureStateFactoryImpl implements FeatureStateFactory {

    @Override
    public FeatureState createFeatureState(FeatureType featureType) {
        return switch (featureType) {
            case INTEGER -> new IntegerFeatureStateImpl();
            case BOOLEAN -> new BooleanFeatureStateImpl();
            case DROPDOWN -> new DropdownFeatureStateImpl();
            case TEXT -> new TextFeatureStateImpl();
        };
    }

}
