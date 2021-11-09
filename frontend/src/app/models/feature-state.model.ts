export interface BaseFeatureState { }

export interface ValueFeatureState extends BaseFeatureState {
  value: number;
}

export interface BooleanFeatureState extends BaseFeatureState {
  enabled: boolean;
}

export type FeatureState = ValueFeatureState | BooleanFeatureState;
