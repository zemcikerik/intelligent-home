import { createAction, props } from '@ngrx/store';
import { HomeStatus, ServerInfo } from '../../models';

export const getHomeStatus = createAction('[Home] Get Status');
export const getHomeStatusSuccess = createAction('[Home] Get Status Success', props<{ status: HomeStatus }>());
export const getHomeStatusFailure = createAction('[Home] Get Status Failure', props<{ error: string }>());

export const setHomeServer = createAction('[Home] Set Server', props<{ server: ServerInfo }>());
export const setHomeServerSuccess = createAction('[Home] Set Server Success');
export const setHomeServerFailure = createAction('[Home] Set Server Failure', props<{ error: string }>());

export const disconnectHome = createAction('[Home] Disconnect');
export const disconnectHomeSuccess = createAction('[Home] Disconnect Success');
export const disconnectHomeFailure = createAction('[Home] Disconnect Failure', props<{ error: string }>());
