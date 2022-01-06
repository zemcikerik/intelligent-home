package dev.zemco.intelligenthome.backend.feature;

import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

import java.util.Map;
import java.util.UUID;

@Controller
@AllArgsConstructor
public class FeatureController {

    private final FeatureService featureService;
    private final FeatureUpdateService featureUpdateService;
    private final RemoteFeatureFactory remoteFeatureFactory;

    @MessageMapping("/client/feature/request-update/{id}")
    public void requestFeatureUpdate(@DestinationVariable UUID id, @Payload Map<String, Object> update) {
        this.featureUpdateService.handleFeatureUpdateRequest(id, update);
    }

    @MessageMapping("/device/feature/register")
    public void registerFeature(@Payload FeatureDto featureDto) {
        // TODO: refactor this to service?
        RemoteFeature feature = this.remoteFeatureFactory.createRemoteFeature(featureDto);
        this.featureService.registerFeature(feature);
    }

    @MessageMapping("/device/feature/update/{id}")
    public void updateFeature(@DestinationVariable UUID id, @Payload Map<String, Object> update) {
        this.featureUpdateService.handleFeatureUpdate(id, update);
    }

    @MessageMapping("/device/feature/unregister/{id}")
    public void unregisterFeature(@DestinationVariable UUID id) {
        this.featureService.getFeatureById(id).ifPresent(this.featureService::unregisterFeature);
    }

}
