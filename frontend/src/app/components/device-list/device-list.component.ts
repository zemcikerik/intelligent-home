import { Component, OnInit } from '@angular/core';
import { DeviceFacade } from '../../store';
import { Observable } from 'rxjs';
import { Device } from '../../models';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent {

  devices$: Observable<Device[]>;

  constructor(deviceFacade: DeviceFacade) {
    this.devices$ = deviceFacade.getAllDevices();
  }

}
