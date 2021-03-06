import { createReducer, on } from '@ngrx/store';
import { WifiNetwork, WifiStatus } from '../../models';
import * as Action from '../actions';

export const WIFI_FEATURE_KEY = 'wifi';

export interface WifiPartialState {
  [WIFI_FEATURE_KEY]: WifiState;
}

export interface WifiState {
  loading: boolean;
  error: string | null;
  status: WifiStatus | null;
  availableNetworks: WifiNetwork[] | null;
}

export const initialWifiState: WifiState = {
  loading: false,
  error: null,
  status: null,
  availableNetworks: null,
};

export const wifiReducer = createReducer(
  initialWifiState,

  on(Action.getNetworkStatus, state => ({ ...state, loading: true })),
  on(Action.getNetworkStatusSuccess, (state, { status }) => ({ ...state, loading: false, status })),
  on(Action.getNetworkStatusFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(Action.getAvailableNetworks, state => ({ ...state, loading: true })),
  on(Action.getAvailableNetworksSuccess, (state, { networks }) => ({
    ...state,
    loading: false,
    availableNetworks: networks.filter(network => network.ssid !== '') // filter out hidden networks
  })),
  on(Action.getAvailableNetworksError, (state, { error }) => ({ ...state, loading: false, error })),

  on(Action.connectWifi, state => ({ ...state, loading: true })),
  on(Action.connectWifiSuccess, state => ({ ...state, loading: false })),
  on(Action.connectWifiFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(Action.disconnectWifi, state => ({ ...state, loading: true })),
  on(Action.disconnectWifiSuccess, state => ({ ...state, loading: false })),
  on(Action.disconnectWifiFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
