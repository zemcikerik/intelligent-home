import { HOME_FEATURE_KEY, HomeState } from '../reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectHomeState = createFeatureSelector<HomeState>(HOME_FEATURE_KEY);
export const selectHomeStatus = createSelector(selectHomeState, state => state.status);
export const selectIsHomeLoading = createSelector(selectHomeState, state => state.loading);
export const selectHomeError = createSelector(selectHomeState, state => state.error);
export const selectHomeHasServerInfo = createSelector(selectHomeStatus, status => status?.hasServerInfo ?? false);
