package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.Feature;
import dev.zemco.intelligenthome.backend.feature.FeatureService;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateRequestHandler;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateRequestService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class FeatureUpdateRequestServiceImpl implements FeatureUpdateRequestService {

    private final BeanFactory beanFactory;
    private final FeatureService featureService;
    private final Map<Class<?>, FeatureUpdateRequestHandler> handlers = new HashMap<>();

    @Override
    public void handleFeatureUpdateRequest(UUID featureId, Map<String, String> update) {
        Optional<Feature> foundFeature = this.featureService.getFeatureById(featureId);
        Feature feature = foundFeature.orElseThrow();

        Class<?> handlerClass = feature.getUpdateRequestHandlerClass();
        FeatureUpdateRequestHandler handler = this.handlers.get(handlerClass); // TODO: throw if not found
        handler.handleUpdateRequest(feature, update);
    }

    @Override
    public void registerHandler(Class<? extends FeatureUpdateRequestHandler> handlerClass) {
        // TODO: check if bean exists
        FeatureUpdateRequestHandler handler = this.beanFactory.getBean(handlerClass);
        this.handlers.put(handlerClass, handler);
    }

    @Override
    public void unregisterHandler(Class<? extends FeatureUpdateRequestHandler> handlerClass) {
        this.handlers.remove(handlerClass);
    }

}
