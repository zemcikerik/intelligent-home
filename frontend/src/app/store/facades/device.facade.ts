import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { DevicePartialState } from '../reducers';
import { Observable } from 'rxjs';
import { Device } from '../../models';
import { selectAllDevices } from '../selectors';

@Injectable()
export class DeviceFacade {

  getAllDevices(): Observable<Device[]> {
    return this.store$.select(selectAllDevices);
  }

  constructor(
    private store$: Store<DevicePartialState>
  ) { }

}
