import { APP_STATE_KEY, AppPartialState } from '../reducers';
import { createSelector } from '@ngrx/store';
import { Authority } from '../../models';

export const selectAppState = (state: AppPartialState) => state[APP_STATE_KEY];
export const selectAppPhase = createSelector(selectAppState, state => state.phase);
export const selectAppLoading = createSelector(selectAppState, state => state.loading);
export const selectAppError = createSelector(selectAppState, state => state.error);
export const selectAppJwt = createSelector(selectAppState, state => state.jwt);

export const selectHasAuthority = (authority: Authority) => createSelector(
  selectAppJwt,
  jwt => !!jwt && jwt.authorities.includes(authority)
);
