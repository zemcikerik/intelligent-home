package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.Feature;
import dev.zemco.intelligenthome.backend.feature.FeatureService;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateRequestHandler;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateRequestService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class FeatureUpdateRequestServiceImpl implements FeatureUpdateRequestService {

    private final BeanFactory beanFactory;
    private final FeatureService featureService;

    @Override
    public void handleFeatureUpdateRequest(UUID featureId, Map<String, String> update) {
        Optional<Feature> foundFeature = this.featureService.getFeatureById(featureId);
        Feature feature = foundFeature.orElseThrow();
        Class<? extends FeatureUpdateRequestHandler> handlerClass = feature.getUpdateRequestHandlerClass();

        if (handlerClass == null) {
            return;
        }

        FeatureUpdateRequestHandler handler = this.beanFactory.getBean(handlerClass);
        handler.handleUpdateRequest(feature, update);
    }

}
