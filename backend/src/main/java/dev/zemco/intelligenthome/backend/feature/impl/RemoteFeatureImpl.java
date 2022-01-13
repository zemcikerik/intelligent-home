package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.FeatureType;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateHandler;
import dev.zemco.intelligenthome.backend.feature.RemoteFeature;
import dev.zemco.intelligenthome.backend.feature.state.FeatureState;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class RemoteFeatureImpl implements RemoteFeature {
    private final UUID id;
    private final UUID deviceId;
    private final String name;
    private final FeatureType type;
    private final FeatureState state;
    private final Class<? extends FeatureUpdateHandler> updateHandlerClass;
    private final String sessionId;

    @Override
    public Class<? extends FeatureUpdateHandler> getUpdateRequestHandlerClass() {
        return RemoteFeatureUpdateHandler.class;
    }
}
