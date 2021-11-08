import { Injectable } from '@angular/core';
import { ServerConnectionService } from './server-connection.service';
import { Observable } from 'rxjs';
import { Device } from '../models';

@Injectable()
export class DeviceService {

  readonly deviceAdd$: Observable<Device>;
  readonly deviceUpdate$: Observable<Device>;
  readonly deviceRemove$: Observable<string>;

  constructor(serverConnectionService: ServerConnectionService) {
    this.deviceAdd$ = serverConnectionService.watch<Device>('/device/add');
    this.deviceUpdate$ = serverConnectionService.watch<Device>('/device/update');
    this.deviceRemove$ = serverConnectionService.watch<string>('/device/remove');
  }

}
