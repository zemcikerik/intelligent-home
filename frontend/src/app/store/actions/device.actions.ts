import { createAction, props } from '@ngrx/store';
import { Device } from '../../models';

export const addDevice = createAction('[Device] Add Device', props<{ device: Device }>());
export const loadDevices = createAction('[Device] Load Devices', props<{ devices: Device[] }>());
export const removeDevice = createAction('[Device] Remove Device', props<{ deviceId: string }>());
