import { LOGIN_STATE_KEY, LoginPartialState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const selectLoginState = (state: LoginPartialState) => state[LOGIN_STATE_KEY];
export const selectLoginLoading = createSelector(selectLoginState, state => state.loading);
export const selectLoginError = createSelector(selectLoginState, state => state.error);
