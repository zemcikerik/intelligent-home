import { WIFI_FEATURE_KEY, WifiPartialState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const selectWifiState = (state: WifiPartialState) => state[WIFI_FEATURE_KEY];
export const selectWifiStatus = createSelector(selectWifiState, state => state.status);
export const selectAvailableNetworks = createSelector(selectWifiState, state => state.availableNetworks);
export const selectWifiConnected = createSelector(selectWifiStatus, status => status?.connected);
export const selectWifiLoading = createSelector(selectWifiState, state => state.loading);
