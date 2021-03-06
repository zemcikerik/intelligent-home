import { Injectable } from '@angular/core';
import { DeviceService } from '../../services';
import { createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { addDevice, removeDevice } from '../actions';

@Injectable()
export class DeviceEffects {

  deviceAdd$ = createEffect(() =>
    this.deviceService.deviceAdd$.pipe(
      map(device => addDevice({ device }))
    )
  );

  deviceRemove$ = createEffect(() =>
    this.deviceService.deviceRemove$.pipe(
      map(deviceId => removeDevice({ deviceId }))
    )
  );

  constructor(
    private deviceService: DeviceService
  ) { }

}
