package dev.zemco.intelligenthome.backend.feature.state.impl;

import dev.zemco.intelligenthome.backend.feature.state.DropdownFeatureState;

import java.util.List;
import java.util.Map;

public class DropdownFeatureStateImpl implements DropdownFeatureState {

    private List<String> choices;
    private String selected;

    @Override
    public void toMap(Map<String, Object> map) {
        map.put("choices", this.choices);
        map.put("selected", this.selected);
    }

    @Override
    public String getSelected() {
        return this.selected;
    }

    @Override
    public void setSelected(String selected) {
        this.selected = selected;
    }

    @Override
    public List<String> getChoices() {
        return this.choices;
    }

    @Override
    public void setChoices(List<String> choices) {
        this.choices = choices;
    }

}
