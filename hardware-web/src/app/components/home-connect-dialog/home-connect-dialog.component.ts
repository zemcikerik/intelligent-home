import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-connect-dialog',
  templateUrl: './home-connect-dialog.component.html',
  styleUrls: ['./home-connect-dialog.component.scss']
})
export class HomeConnectDialogComponent {

  connectForm = new FormGroup({
    hostname: new FormControl(null, [Validators.required]),
    port: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(65535)]),
    path: new FormControl(null, [Validators.required]),
  });

  constructor(private matDialogRef: MatDialogRef<HomeConnectDialogComponent>) {
  }

  submit(): void {
    this.matDialogRef.close(this.connectForm.value);
  }

}
