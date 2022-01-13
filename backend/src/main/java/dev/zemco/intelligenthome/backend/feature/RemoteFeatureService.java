package dev.zemco.intelligenthome.backend.feature;

import java.util.List;

public interface RemoteFeatureService {
    List<RemoteFeature> getFeaturesBySessionId(String sessionId);
}
