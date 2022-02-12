import { WifiEncryptionType } from './wifi-encryption-type.model';

export interface WifiNetwork {
  ssid: string;
  rssi: number;
  channel: number;
  type: WifiEncryptionType;
}
