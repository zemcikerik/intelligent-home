import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Feature } from '../../models';
import { createReducer, on } from '@ngrx/store';
import * as FeatureActions from '../actions/feature.actions';

export const FEATURE_STATE_KEY = 'feature';

export interface FeaturePartialState {
  [FEATURE_STATE_KEY]: FeatureState;
}

export interface FeatureState extends EntityState<Feature> { }

export const featureAdapter = createEntityAdapter<Feature>();
export const initialFeatureState = featureAdapter.getInitialState();

export const featureReducer = createReducer(
  initialFeatureState,
  on(FeatureActions.loadFeaturesSuccess, (state, {features}) => featureAdapter.setAll(features, state))
);
