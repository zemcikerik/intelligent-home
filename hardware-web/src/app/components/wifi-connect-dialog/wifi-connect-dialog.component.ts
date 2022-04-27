import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WifiNetwork } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wifi-connect',
  templateUrl: './wifi-connect-dialog.component.html',
  styleUrls: ['./wifi-connect-dialog.component.scss']
})
export class WifiConnectDialogComponent {

  disableSSIDField = false;

  infoForm = new FormGroup({
    ssid: new FormControl(null, [Validators.required]),
    pswd: new FormControl(null, [Validators.required]),
  });

  constructor(
    private matDialogRef: MatDialogRef<WifiConnectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) networkInfo?: WifiNetwork,
  ) {
    if (networkInfo) {
      this.disableSSIDField = true;
      this.infoForm.controls['ssid'].setValue(networkInfo.ssid);
    }
  }

  submit(): void {
    this.matDialogRef.close(this.infoForm.value);
  }

}
