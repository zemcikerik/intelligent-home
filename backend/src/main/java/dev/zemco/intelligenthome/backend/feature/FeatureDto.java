package dev.zemco.intelligenthome.backend.feature;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeatureDto {
    private String name;
    private FeatureType type;
    private Object state;
}
