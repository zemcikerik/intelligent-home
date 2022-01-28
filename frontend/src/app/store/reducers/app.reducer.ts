import { createReducer, on } from '@ngrx/store';
import { AppPhase } from '../../app-phase.enum';
import * as AppActions from '../actions/app.actions';
import { Jwt } from '../../models';

export const APP_STATE_KEY = 'app';

export interface AppPartialState {
  [APP_STATE_KEY]: AppState;
}

export interface AppState {
  phase: AppPhase;
  loading: boolean;
  error: string | null;
  jwt: Jwt | null;
}

export const initialAppState: AppState = {
  phase: AppPhase.AUTH,
  loading: true,
  error: null,
  jwt: null,
};

export const appReducer = createReducer(
  initialAppState,
  on(AppActions.appAuthSuccess, (state, { jwt }): AppState => ({ ...state, phase: AppPhase.CONNECT, loading: true, jwt })),
  on(AppActions.appAuthFailure, (state): AppState => ({ ...state, phase: AppPhase.LOGIN, loading: false })),
  on(AppActions.appConnectSuccess, (state): AppState => ({ ...state, phase: AppPhase.LOAD })),
  on(AppActions.appConnectFailure, (state, { error }): AppState => ({ ...state, loading: false, error })),
  on(AppActions.appLoadSuccess, (state): AppState => ({ ...state, phase: AppPhase.READY, loading: false })),
  on(AppActions.appLoadFailure, (state, { error }): AppState => ({ ...state, loading: false, error })),
);
