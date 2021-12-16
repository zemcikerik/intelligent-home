import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-device-add-dialog',
  templateUrl: './device-add-dialog.component.html',
  styleUrls: ['./device-add-dialog.component.scss']
})
export class DeviceAddDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
