package dev.zemco.intelligenthome.backend.feature;

import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FeatureServiceImpl implements FeatureService {

    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public void updateFeature(Feature feature) {
    }

}
