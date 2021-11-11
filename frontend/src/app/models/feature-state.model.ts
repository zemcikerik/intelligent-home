export interface BaseFeatureState { }

export interface IntegerFeatureState extends BaseFeatureState {
  value: number;
}

export interface BooleanFeatureState extends BaseFeatureState {
  enabled: boolean;
}

export type FeatureState = IntegerFeatureState | BooleanFeatureState;
