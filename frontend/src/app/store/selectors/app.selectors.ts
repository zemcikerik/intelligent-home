import { APP_STATE_KEY, AppPartialState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const selectAppState = (state: AppPartialState) => state[APP_STATE_KEY];
export const selectAppLoading = createSelector(selectAppState, state => state.loading);
export const selectAppError = createSelector(selectAppState, state => state.error);
