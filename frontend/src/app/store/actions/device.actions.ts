import { createAction, props } from '@ngrx/store';
import { Device } from '../../models';

export const loadDevicesSuccess = createAction('[Device] Load Devices Success', props<{ devices: Device[] }>());
export const addDevice = createAction('[Device] Add Device', props<{ device: Device }>());
export const removeDevice = createAction('[Device] Remove Device', props<{ deviceId: string }>());
