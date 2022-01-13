package dev.zemco.intelligenthome.backend.feature;

import lombok.*;

import java.util.Map;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeatureUpdateRequestDto {
    private UUID featureId;
    private Map<String, Object> update;
}
