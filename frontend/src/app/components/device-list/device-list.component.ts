import { Component } from '@angular/core';
import { AppFacade, DeviceFacade } from '../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent {

  deviceIds$: Observable<string[]>;
  username$: Observable<string>;

  constructor(
    deviceFacade: DeviceFacade,
    appFacade: AppFacade,
  ) {
    this.deviceIds$ = deviceFacade.getAllDeviceIds();
    this.username$ = appFacade.getUsername();
  }

}
