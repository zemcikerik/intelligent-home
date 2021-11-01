package dev.zemco.intelligenthome.backend.feature;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GenericFeature implements Feature {
    private String name;
    private FeatureType type;
    private Object state;
}
