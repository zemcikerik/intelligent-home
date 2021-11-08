package dev.zemco.intelligenthome.backend.feature.state;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ValueFeatureStateImpl implements ValueFeatureState {
    private double value;
}
