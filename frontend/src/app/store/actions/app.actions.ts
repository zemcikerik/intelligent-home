import { createAction, props } from '@ngrx/store';

export const appLoadingSuccess = createAction('[App] Loading Success');
export const appLoadingFailure = createAction('[App] Loading Failure', props<{ error: string }>());
