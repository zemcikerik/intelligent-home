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
  on(FeatureActions.loadFeaturesSuccess, (state, {features}) => featureAdapter.setAll(features, state)),
  on(FeatureActions.addFeature, (state, {feature}) => featureAdapter.addOne(feature, state)),
  on(FeatureActions.updateFeature, (state, {feature}) => featureAdapter.setOne(feature, state)),
  on(FeatureActions.removeFeature, (state, {featureId}) => featureAdapter.removeOne(featureId, state))
);
