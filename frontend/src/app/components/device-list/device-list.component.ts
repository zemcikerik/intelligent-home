import { Component } from '@angular/core';
import { DeviceFacade } from '../../store';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { DeviceAddDialogComponent } from 'src/app/components/device-add-dialog/device-add-dialog.component';
import { AddDeviceService } from 'src/app/services/add-device.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent {

  deviceIds$: Observable<string[]>;

  constructor(deviceFacade: DeviceFacade, private dialog: MatDialog, private addDeviceService: AddDeviceService) {
    this.deviceIds$ = deviceFacade.getAllDeviceIds();
    this.deviceIds$.subscribe( _ => dialog.closeAll() )
  }

  //TODO: rewrite and move this
  requestAdd(){
    const requestId = Math.random().toString(36).substr(2, 6);
    this.addDeviceService.requestDeviceAddition(requestId).subscribe();
    this.dialog.open(DeviceAddDialogComponent, {
      data: { id: requestId },
    });
  }
}
