import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { DevicePartialState } from '../reducers';
import { Observable } from 'rxjs';
import { Device } from '../../models';
import { selectAllDeviceIds, selectAllDevices, selectDevice } from '../selectors';

@Injectable()
export class DeviceFacade {

  getAllDevices(): Observable<Device[]> {
    return this.store$.select(selectAllDevices);
  }

  getAllDeviceIds(): Observable<string[]> {
    return this.store$.select(selectAllDeviceIds);
  }

  getDeviceById(id: string): Observable<Device | undefined> {
    return this.store$.select(selectDevice(id));
  }

  constructor(
    private store$: Store<DevicePartialState>
  ) { }

}
