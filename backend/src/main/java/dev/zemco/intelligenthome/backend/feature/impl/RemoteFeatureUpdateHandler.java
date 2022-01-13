package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.Feature;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateHandler;
import dev.zemco.intelligenthome.backend.feature.FeatureUpdateRequestDto;
import dev.zemco.intelligenthome.backend.feature.RemoteFeature;
import dev.zemco.intelligenthome.backend.session.SimpSessionMessageSender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class RemoteFeatureUpdateHandler implements FeatureUpdateHandler {

    private final SimpSessionMessageSender sessionMessageSender;

    @Override
    public void handleUpdate(Feature feature, Map<String, Object> update) {
        RemoteFeature remoteFeature = (RemoteFeature) feature;
        String sessionId = remoteFeature.getSessionId();

        FeatureUpdateRequestDto dto = new FeatureUpdateRequestDto(feature.getId(), update);
        this.sessionMessageSender.convertAndSendToSession(sessionId, "/queue/device/feature/request-update", dto);
    }

}
