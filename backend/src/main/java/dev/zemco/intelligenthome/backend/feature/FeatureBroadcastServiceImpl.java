package dev.zemco.intelligenthome.backend.feature;

import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FeatureBroadcastServiceImpl implements FeatureBroadcastService {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public void broadcastFeatureAddition(Feature feature) {
        this.simpMessagingTemplate.convertAndSend("/feature/add", feature.toDto());
    }

    @Override
    public void broadcastFeatureUpdate(Feature feature) {
        this.simpMessagingTemplate.convertAndSend("/feature/update", feature.toDto());
    }

    @Override
    public void broadcastFeatureRemoval(Feature feature) {
        this.simpMessagingTemplate.convertAndSend("/feature/remove", feature.getId());
    }

}
