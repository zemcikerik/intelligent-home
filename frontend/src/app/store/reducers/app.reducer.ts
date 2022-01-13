import { createReducer, on } from '@ngrx/store';
import * as AppActions from '../actions/app.actions';

export const APP_STATE_KEY = 'app';

export interface AppPartialState {
  [APP_STATE_KEY]: AppState;
}

export interface AppState {
  loading: boolean;
  error: string | null;
}

export const initialAppState: AppState = {
  loading: true,
  error: null
};

export const appReducer = createReducer(
  initialAppState,
  on(AppActions.appLoadingSuccess, (state): AppState => ({ ...state, loading: false })),
  on(AppActions.appLoadingFailure, (state, { error }): AppState => ({ ...state, loading: false, error }))
);
