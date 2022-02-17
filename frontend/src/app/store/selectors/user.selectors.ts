import { USER_STATE_KEY, UserPartialState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const selectUserState = (state: UserPartialState) => state[USER_STATE_KEY];
export const selectUsers = createSelector(selectUserState, state => state.users);
export const selectAreUsersLoading = createSelector(selectUserState, state => state.loading);
export const selectAreUsersInitialized = createSelector(selectUserState, state => state.initialized);
export const selectUserError = createSelector(selectUserState, state => state.error);
