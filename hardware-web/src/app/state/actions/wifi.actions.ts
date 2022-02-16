import { createAction, props } from '@ngrx/store';
import { WifiNetwork, WifiStatus } from '../../models';

export const getNetworkStatus = createAction('[WiFi] Get Network Status');
export const getNetworkStatusSuccess = createAction('[WiFi] Get Network Status Success', props<{ status: WifiStatus }>());
export const getNetworkStatusFailure = createAction('[WiFi] Get Network Status Failure', props<{ error: string }>());

export const getAvailableNetworks = createAction('[WiFi] Get Available Networks');

export const getAvailableNetworksSuccess = createAction(
  '[WiFi] Get Available Networks Success',
  props<{ networks: WifiNetwork[] }>()
);

export const getAvailableNetworksError = createAction(
  '[WiFi] Get Available Networks Failure',
  props<{ error: string }>()
);
