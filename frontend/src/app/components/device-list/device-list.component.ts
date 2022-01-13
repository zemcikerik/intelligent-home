import { Component } from '@angular/core';
import { DeviceFacade } from '../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent {

  deviceIds$: Observable<string[]>;

  constructor(deviceFacade: DeviceFacade) {
    this.deviceIds$ = deviceFacade.getAllDeviceIds();
  }

}
