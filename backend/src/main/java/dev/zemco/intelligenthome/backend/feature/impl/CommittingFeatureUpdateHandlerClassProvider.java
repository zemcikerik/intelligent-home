package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.FeatureType;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateHandler;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateHandlerClassProvider;
import org.springframework.stereotype.Component;

@Component
public class CommittingFeatureUpdateHandlerClassProvider implements FeatureUpdateHandlerClassProvider {

    @Override
    public Class<? extends FeatureUpdateHandler> getFeatureUpdateHandlerClass(FeatureType type) {
        return switch (type) {
            case BOOLEAN -> BooleanFeatureUpdateHandler.class;
            case BUTTON -> IgnoreFeatureUpdateHandler.class;
            case DROPDOWN -> DropdownFeatureUpdateHandler.class;
            case INTEGER -> IntegerFeatureUpdateHandler.class;
            case TEXT -> TextFeatureUpdateHandler.class;
            case RGB -> RgbFeatureUpdateHandler.class;

            //noinspection UnnecessaryDefault
            default -> throw new IndexOutOfBoundsException();
        };
    }

}
