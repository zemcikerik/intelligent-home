export interface BaseFeatureState { }

export interface IntegerFeatureState extends BaseFeatureState {
  value: number;
}

export interface BooleanFeatureState extends BaseFeatureState {
  enabled: boolean;
}

export interface ButtonFeatureState extends BaseFeatureState { }

export interface DropdownFeatureState extends BaseFeatureState {
  choices: string[];
  selected: string;
}

export interface TextFeatureState extends BaseFeatureState {
  text: string;
}

export interface StringFeatureState extends BaseFeatureState {
  text: string;
}

export interface RgbFeatureState extends BaseFeatureState {
  r: number;
  g: number;
  b: number;
}

export type FeatureState = IntegerFeatureState
  | BooleanFeatureState
  | ButtonFeatureState
  | DropdownFeatureState
  | TextFeatureState
  | StringFeatureState
  | RgbFeatureState;
