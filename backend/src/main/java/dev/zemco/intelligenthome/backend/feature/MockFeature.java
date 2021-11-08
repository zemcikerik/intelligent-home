package dev.zemco.intelligenthome.backend.feature;

import dev.zemco.intelligenthome.backend.feature.state.FeatureState;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class MockFeature implements Feature {
    private final UUID id;
    private final UUID deviceId;
    private final String name;
    private final FeatureType type;
    private final FeatureState state;
}
