import { FeatureType } from './feature-type.model';
import { BooleanFeatureState, DropdownFeatureState, FeatureState, IntegerFeatureState } from './feature-state.model';

export interface BaseFeature {
  id: string;
  deviceId: string;
  name: string;
  type: FeatureType;
  state: FeatureState;
}

export interface IntegerFeature extends BaseFeature {
  type: FeatureType.INTEGER;
  state: IntegerFeatureState;
}

export interface BooleanFeature extends BaseFeature {
  type: FeatureType.BOOLEAN;
  state: BooleanFeatureState;
}

export interface DropdownFeature extends BaseFeature {
  type: FeatureType.DROPDOWN;
  state: DropdownFeatureState;
}

export type Feature = IntegerFeature | BooleanFeature | DropdownFeature;
