package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.Feature;
import dev.zemco.intelligenthome.backend.feature.FeatureService;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateHandler;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@AllArgsConstructor
public class FeatureUpdateServiceImpl implements FeatureUpdateService {

    private final BeanFactory beanFactory;
    private final FeatureService featureService;

    @Override
    public void handleFeatureUpdate(UUID featureId, Map<String, Object> update) {
        Feature feature = this.getFeatureById(featureId);
        Class<? extends FeatureUpdateHandler> handlerClass = feature.getUpdateHandlerClass();
        this.handleFeatureUpdate(feature, update, handlerClass);
    }

    @Override
    public void handleFeatureUpdateRequest(UUID featureId, Map<String, Object> update) {
        Feature feature = this.getFeatureById(featureId);
        Class<? extends FeatureUpdateHandler> handlerClass = feature.getUpdateRequestHandlerClass();
        this.handleFeatureUpdate(feature, update, handlerClass);
    }

    @Override
    public void handleFeatureUpdate(
            Feature feature,
            Map<String, Object> update,
            Class<? extends FeatureUpdateHandler> updateHandlerClass
    ) {
        if (updateHandlerClass == null) {
            return;
        }

        FeatureUpdateHandler handler = this.beanFactory.getBean(updateHandlerClass);
        handler.handleUpdate(feature, update);
    }

    private Feature getFeatureById(UUID featureId) {
        return this.featureService.getFeatureById(featureId).orElseThrow();
    }

}
