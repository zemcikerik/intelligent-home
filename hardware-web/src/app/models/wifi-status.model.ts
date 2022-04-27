export interface DisconnectedWifiStatus {
  connected: false;
}

export interface ConnectedWifiStatus {
  connected: true;
  ssid: string;
  bssid: string;
  rssi: number;
  ip: string;
}

export type WifiStatus = DisconnectedWifiStatus | ConnectedWifiStatus;
