import { FeatureType } from './feature-type.model';
import { BooleanFeatureState, FeatureState, ValueFeatureState } from './feature-state.model';

export interface BaseFeature {
  id: string;
  deviceId: string;
  name: string;
  type: FeatureType;
  state: FeatureState;
}

export interface ValueFeature extends BaseFeature {
  type: FeatureType.VALUE;
  state: ValueFeatureState;
}

export interface BooleanFeature extends BaseFeature {
  type: FeatureType.BOOLEAN;
  state: BooleanFeatureState;
}

export type Feature = ValueFeature | BooleanFeature;
