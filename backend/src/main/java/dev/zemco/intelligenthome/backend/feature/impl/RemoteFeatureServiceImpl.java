package dev.zemco.intelligenthome.backend.feature.impl;

import dev.zemco.intelligenthome.backend.feature.FeatureService;
import dev.zemco.intelligenthome.backend.feature.RemoteFeature;
import dev.zemco.intelligenthome.backend.feature.RemoteFeatureService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RemoteFeatureServiceImpl implements RemoteFeatureService {

    private final FeatureService featureService;

    @Override
    public List<RemoteFeature> getFeaturesBySessionId(String sessionId) {
        return this.featureService.getAllFeatures().stream()
                .filter(feature -> feature instanceof RemoteFeature)
                .map(feature -> (RemoteFeature) feature)
                .filter(feature -> feature.getSessionId().equals(sessionId))
                .toList();
    }

}
