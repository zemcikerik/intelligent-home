import { Injectable } from '@angular/core';
import { ServerConnectionService } from './server-connection.service';
import { Observable } from 'rxjs';
import { Device } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class DeviceService {

  readonly deviceAdd$: Observable<Device>;
  readonly deviceUpdate$: Observable<Device>;
  readonly deviceRemove$: Observable<string>;

  constructor(serverConnectionService: ServerConnectionService) {
    this.deviceAdd$ = serverConnectionService.stomp.watch('/device/add').pipe(
      map(message => JSON.parse(message.body) as Device)
    );

    this.deviceUpdate$ = serverConnectionService.stomp.watch('/device/update').pipe(
      map(message => JSON.parse(message.body) as Device)
    );

    this.deviceRemove$ = serverConnectionService.stomp.watch('/device/remove').pipe(
      map(message => JSON.parse(message.body) as string)
    );
  }

}
