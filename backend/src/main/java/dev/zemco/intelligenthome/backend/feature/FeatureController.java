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

    private final FeatureUpdateRequestService featureUpdateRequestService;

    @MessageMapping("/feature/request-update/{id}")
    public void requestFeatureUpdate(@DestinationVariable UUID id, @Payload Map<String, String> update) {
        this.featureUpdateRequestService.handleFeatureUpdateRequest(id, update);
    }

}
