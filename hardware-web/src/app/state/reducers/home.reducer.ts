import { createReducer, on } from '@ngrx/store';
import * as Action from '../actions';
import { HomeStatus } from '../../models';

export const HOME_FEATURE_KEY = 'home';

export interface HomePartialState {
  [HOME_FEATURE_KEY]: HomeState;
}

export interface HomeState {
  loading: boolean;
  error: string | null;
  status: HomeStatus | null;
}

export const initialHomeState: HomeState = {
  loading: false,
  error: null,
  status: null,
};

export const homeReducer = createReducer(
  initialHomeState,

  on(Action.getHomeStatus, state => ({ ...state, loading: true })),
  on(Action.getHomeStatusSuccess, (state, { status }) => ({ ...state, loading: false, status })),
  on(Action.getHomeStatusFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(Action.setHomeServer, state => ({ ...state, loading: true })),
  on(Action.setHomeServerSuccess, state => ({ ...state, loading: false })),
  on(Action.setHomeServerFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(Action.disconnectHome, state => ({ ...state, loading: true })),
  on(Action.disconnectHomeSuccess, state => ({ ...state, loading: false })),
  on(Action.disconnectHomeFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
