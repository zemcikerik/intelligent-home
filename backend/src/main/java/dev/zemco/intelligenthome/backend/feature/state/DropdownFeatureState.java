package dev.zemco.intelligenthome.backend.feature.state;

import java.util.List;

public interface DropdownFeatureState extends FeatureState {
    String getSelected();
    void setSelected(String selected);
    List<String> getChoices();
    void setChoices(List<String> choices);
}
