export interface BaseFeatureState { }

export interface IntegerFeatureState extends BaseFeatureState {
  value: number;
}

export interface BooleanFeatureState extends BaseFeatureState {
  enabled: boolean;
}

export interface DropdownFeatureState extends BaseFeatureState {
  choices: string[];
  selected: string;
}

export interface TextFeatureState extends BaseFeatureState {
  text: string;
}

export type FeatureState = IntegerFeatureState | BooleanFeatureState | DropdownFeatureState | TextFeatureState;
