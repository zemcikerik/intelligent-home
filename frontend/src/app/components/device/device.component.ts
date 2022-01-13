import { Component, Input, OnInit } from '@angular/core';
import { DeviceFacade } from '../../store';
import { EMPTY, Observable } from 'rxjs';
import { Device } from '../../models';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  @Input() id = '';
  device$: Observable<Device | undefined> = EMPTY;

  constructor(
    private deviceFacade: DeviceFacade
  ) { }

  ngOnInit(): void {
    this.device$ = this.deviceFacade.getDeviceById(this.id);
  }

}
