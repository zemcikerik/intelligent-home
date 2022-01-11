package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.*;
import dev.zemco.intelligenthome.backend.feature.state.FeatureState;
import dev.zemco.intelligenthome.backend.feature.state.FeatureStateFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RemoteFeatureFactoryImpl implements RemoteFeatureFactory {

    private final FeatureStateFactory featureStateFactory;
    private final FeatureUpdateHandlerClassProvider featureUpdateHandlerClassProvider;

    @Override
    public RemoteFeature createRemoteFeature(FeatureDto featureDto, String sessionId) {
        FeatureType type = featureDto.getType();
        FeatureState state = this.featureStateFactory.createFeatureState(featureDto.getType());
        Class<? extends FeatureUpdateHandler> updateHandler = this.featureUpdateHandlerClassProvider.getFeatureUpdateHandlerClass(type);

        RemoteFeature feature = new RemoteFeatureImpl(
                featureDto.getId(),
                featureDto.getDeviceId(),
                featureDto.getName(),
                type,
                state,
                updateHandler,
                sessionId
        );

        // TODO: handle original state
        return feature;
    }

}
