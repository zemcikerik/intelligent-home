import { DEVICE_STATE_KEY, deviceAdapter, DevicePartialState } from '../reducers';
import { createSelector } from '@ngrx/store';

const { selectAll } = deviceAdapter.getSelectors();

export const selectDeviceState = (state: DevicePartialState) => state[DEVICE_STATE_KEY];
export const selectAllDevices = createSelector(selectDeviceState, selectAll);
export const selectAllDeviceIds = createSelector(selectDeviceState, state => state.ids as string[]);
export const selectDevice = (id: string) => createSelector(selectDeviceState, state => state.entities[id]);
