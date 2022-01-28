import { createAction, props } from '@ngrx/store';

export const appAuthSuccess = createAction('[App] Auth Success');
export const appConnectSuccess = createAction('[App] Connect Success');
export const appConnectFailure = createAction('[App] Connect Failure', props<{ error: string }>());
export const appLoadSuccess = createAction('[App] Load Success');
export const appLoadFailure = createAction('[App] Load Failure', props<{ error: string }>());
