import { FEATURE_STATE_KEY, featureAdapter, FeaturePartialState } from '../reducers';
import { createSelector } from '@ngrx/store';

const { selectAll } = featureAdapter.getSelectors();

export const selectFeatureState = (state: FeaturePartialState) => state[FEATURE_STATE_KEY];
export const selectAllFeatures = createSelector(selectFeatureState, selectAll);
