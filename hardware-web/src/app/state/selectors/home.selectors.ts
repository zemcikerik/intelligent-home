import { HOME_FEATURE_KEY, HomePartialState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const selectHomeState = (state: HomePartialState) => state[HOME_FEATURE_KEY];
export const selectHomeStatus = createSelector(selectHomeState, state => state.status);
export const selectIsHomeLoading = createSelector(selectHomeState, state => state.loading);
export const selectHomeError = createSelector(selectHomeState, state => state.error);
