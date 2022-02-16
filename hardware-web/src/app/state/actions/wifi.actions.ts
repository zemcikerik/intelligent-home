import { createAction, props } from '@ngrx/store';
import { WifiConnect, WifiNetwork, WifiStatus } from '../../models';

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

export const connectWifi = createAction('[WiFi] Connect', props<{ connectInfo: WifiConnect }>());
export const connectWifiSuccess = createAction('[WiFi] Connect Success');
export const connectWifiFailure = createAction('[WiFi] Connect Failure', props<{ error: string }>());

export const disconnectWifi = createAction('[WiFi] Disconnect');
export const disconnectWifiSuccess = createAction('[WiFi] Disconnect Success');
export const disconnectWifiFailure = createAction('[WiFi] Disconnect Failure', props<{ error: string }>());
