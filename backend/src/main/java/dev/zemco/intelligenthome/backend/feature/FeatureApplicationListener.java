package dev.zemco.intelligenthome.backend.feature;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.List;

@Component
@RequiredArgsConstructor
public class FeatureApplicationListener implements ApplicationListener<SessionDisconnectEvent> {

    private final FeatureService featureService;
    private final RemoteFeatureService remoteFeatureService;

    @Override
    public void onApplicationEvent(SessionDisconnectEvent sessionDisconnectEvent) {
        String sessionId = sessionDisconnectEvent.getSessionId();
        List<RemoteFeature> features = this.remoteFeatureService.getFeaturesBySessionId(sessionId);
        features.forEach(featureService::unregisterFeature);
    }

}
