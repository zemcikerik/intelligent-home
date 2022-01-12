import { FeatureType } from './feature-type.model';
import {
  BooleanFeatureState,
  ButtonFeatureState,
  DropdownFeatureState,
  FeatureState,
  IntegerFeatureState,
  TextFeatureState,
  StringFeatureState
} from './feature-state.model';

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

export interface ButtonFeature extends BaseFeature {
  type: FeatureType.BOOLEAN;
  state: ButtonFeatureState;
}

export interface DropdownFeature extends BaseFeature {
  type: FeatureType.DROPDOWN;
  state: DropdownFeatureState;
}

export interface TextFeature extends BaseFeature {
  type: FeatureType.TEXT;
  state: TextFeatureState;
}

export interface StringFeature extends BaseFeature {
  type: FeatureType.STRING;
  state: StringFeatureState;
}

export type Feature = IntegerFeature | BooleanFeature | ButtonFeature | DropdownFeature | TextFeature | StringFeature;
