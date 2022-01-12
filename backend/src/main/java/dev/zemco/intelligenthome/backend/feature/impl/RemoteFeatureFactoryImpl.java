package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.FeatureDto;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateHandler;
import dev.zemco.intelligenthome.backend.feature.RemoteFeature;
import dev.zemco.intelligenthome.backend.feature.RemoteFeatureFactory;
import dev.zemco.intelligenthome.backend.feature.state.FeatureState;
import dev.zemco.intelligenthome.backend.feature.state.FeatureStateFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RemoteFeatureFactoryImpl implements RemoteFeatureFactory {

    private final FeatureStateFactory featureStateFactory;

    @Override
    public RemoteFeature createRemoteFeature(FeatureDto featureDto, String sessionId) {
        FeatureState state = this.featureStateFactory.createFeatureState(featureDto.getType());

        // TODO: refactor this out
        Class<? extends FeatureUpdateHandler> handlerClass = switch (featureDto.getType()) {
            case BOOLEAN -> BooleanFeatureUpdateHandler.class;
            case DROPDOWN -> DropdownFeatureUpdateHandler.class;
            case TEXT -> TextFeatureUpdateHandler.class;
            default -> throw new IndexOutOfBoundsException();
        };

        RemoteFeature feature = new RemoteFeatureImpl(
                featureDto.getId(),
                featureDto.getDeviceId(),
                featureDto.getName(),
                featureDto.getType(),
                state,
                handlerClass,
                sessionId
        );

        // TODO: handle original state
        return feature;
    }

}
