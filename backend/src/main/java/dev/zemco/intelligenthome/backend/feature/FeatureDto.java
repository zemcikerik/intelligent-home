package dev.zemco.intelligenthome.backend.feature;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeatureDto {
    private UUID id;
    private UUID deviceId;
    private String name;
    private FeatureType type;
    private Map<String, Object> state;
}
