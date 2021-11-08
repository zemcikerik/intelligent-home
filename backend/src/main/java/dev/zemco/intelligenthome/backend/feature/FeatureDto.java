package dev.zemco.intelligenthome.backend.feature;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;
import java.util.UUID;

@Getter
@Setter
public class FeatureDto {
    private UUID id;
    private String name;
    private FeatureType type;
    private Map<String, String> state;
}
