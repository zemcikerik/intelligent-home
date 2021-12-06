package dev.zemco.intelligenthome.backend.feature.state.impl;

import dev.zemco.intelligenthome.backend.feature.state.DropdownFeatureState;

import java.util.Collections;
import java.util.List;
import java.util.Map;

public class DropdownFeatureStateImpl implements DropdownFeatureState {

    private final List<String> choices;
    private String selected;

    public DropdownFeatureStateImpl(List<String> choices) {
        this.choices = Collections.unmodifiableList(choices);
        this.selected = choices.get(0);
    }

    @Override
    public void toMap(Map<String, Object> map) {
        this.choices.forEach(choice -> map.put(choice, this.selected.equals(choice)));
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

}
