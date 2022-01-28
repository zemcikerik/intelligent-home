import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Device } from '../../models';
import * as DeviceActions from '../actions/device.actions';

export const DEVICE_STATE_KEY = 'device';

export interface DevicePartialState {
  [DEVICE_STATE_KEY]: DeviceState;
}

export interface DeviceState extends EntityState<Device> { }

export const deviceAdapter = createEntityAdapter<Device>();
export const initialDeviceState = deviceAdapter.getInitialState();

export const deviceReducer = createReducer(
  initialDeviceState,
  on(DeviceActions.addDevice, (state, {device}) => deviceAdapter.addOne(device, state)),
  on(DeviceActions.loadDevices, (state, {devices}) => deviceAdapter.setAll(devices, state)),
  on(DeviceActions.removeDevice, (state, {deviceId}) => deviceAdapter.removeOne(deviceId, state))
);
