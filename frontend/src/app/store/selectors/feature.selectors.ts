import { FEATURE_STATE_KEY, featureAdapter, FeaturePartialState } from '../reducers';
import { createSelector } from '@ngrx/store';

const { selectAll } = featureAdapter.getSelectors();

export const selectFeatureState = (state: FeaturePartialState) => state[FEATURE_STATE_KEY];
export const selectAllFeatures = createSelector(selectFeatureState, selectAll);
export const selectFeature = (id: string) => createSelector(selectFeatureState, state => state.entities[id]);
export const selectFeatureType = (id: string) => createSelector(selectFeature(id), feature => feature?.type);

export const selectFeatureIdsByDeviceId = (deviceId: string) => createSelector(
  selectFeatureState,
  state => Object.values(state.entities)
    .filter(feature => feature && feature.deviceId === deviceId)
    .map(feature => feature?.id as string)
);
