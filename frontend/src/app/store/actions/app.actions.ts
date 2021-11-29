import { createAction, props } from '@ngrx/store';

export const appEstablishConnection = createAction('[App] Establish Connection');
export const appLoadingSuccess = createAction('[App] Loading Success');
export const appLoadingFailure = createAction('[App] Loading Failure', props<{ error: string }>());
