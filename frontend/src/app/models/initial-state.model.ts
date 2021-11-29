import { Device } from './device.model';
import { Feature } from './feature.model';

export interface InitialClientState {
  devices: Device[];
  features: Feature[];
}
