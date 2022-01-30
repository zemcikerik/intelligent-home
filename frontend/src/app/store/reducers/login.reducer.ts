import { createReducer, on } from '@ngrx/store';
import * as LoginActions from '../actions/login.actions';

export const LOGIN_STATE_KEY = 'login';

export interface LoginPartialState {
  [LOGIN_STATE_KEY]: LoginState;
}

export interface LoginState {
  loading: boolean;
  error: string | null;
}

export const initialLoginState: LoginState = {
  loading: false,
  error: null,
};

export const loginReducer = createReducer(
  initialLoginState,
  on(LoginActions.login, (state): LoginState => ({ ...state, loading: true, error: null })),
  on(LoginActions.loginSuccess, (state): LoginState => ({ ...state, loading: false })),
  on(LoginActions.loginFailure, (state, { error }): LoginState => ({ ...state, loading: false, error })),
);
