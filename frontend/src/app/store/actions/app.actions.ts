import { createAction, props } from '@ngrx/store';
import { Jwt } from '../../models';

export const appAuthSuccess = createAction('[App] Auth Success', props<{ jwt: Jwt }>());
export const appAuthFailure = createAction('[App] Auth Failure');
export const appConnectSuccess = createAction('[App] Connect Success');
export const appConnectFailure = createAction('[App] Connect Failure', props<{ error: string }>());
export const appLoadSuccess = createAction('[App] Load Success');
export const appLoadFailure = createAction('[App] Load Failure', props<{ error: string }>());
export const appLogout = createAction('[App] Logout');
