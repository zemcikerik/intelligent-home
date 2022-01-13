package dev.zemco.intelligenthome.backend.feature;

import org.springframework.messaging.simp.SimpAttributesContextHolder;

public interface RemoteFeatureFactory {
    RemoteFeature createRemoteFeature(FeatureDto featureDto, String sessionId);

    default RemoteFeature createRemoteFeature(FeatureDto featureDto) {
        String sessionId = SimpAttributesContextHolder.currentAttributes().getSessionId();
        return this.createRemoteFeature(featureDto, sessionId);
    }
}
