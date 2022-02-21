import { WIFI_FEATURE_KEY, WifiState } from '../reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectWifiState = createFeatureSelector<WifiState>(WIFI_FEATURE_KEY);
export const selectWifiStatus = createSelector(selectWifiState, state => state.status);
export const selectAvailableNetworks = createSelector(selectWifiState, state => state.availableNetworks);
export const selectWifiConnected = createSelector(selectWifiStatus, status => status?.connected);
export const selectWifiLoading = createSelector(selectWifiState, state => state.loading);
export const selectWifiError = createSelector(selectWifiState, state => state.error);
