package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.Feature;
import dev.zemco.intelligenthome.backend.feature.FeatureType;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateRequestHandler;
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
    private final Class<? extends FeatureUpdateRequestHandler> updateRequestHandlerClass;
}
