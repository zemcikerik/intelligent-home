import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDto, UserUpdateDto } from '../../dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent {

  editForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserDto,
  ) {
    this.editForm = new FormGroup({
      role: new FormControl(user.role, [Validators.required]),
      password: new FormControl('', [Validators.minLength(8)])
    });
  }

  get submittable(): boolean {
    return this.editForm.valid && this.hasChanged();
  }

  hasChanged(): boolean {
    const { role, password } = this.editForm.controls;
    return role.value !== this.user.role || password.value !== '';
  }

  submit(): void {
    const { role, password } = this.editForm.controls;
    const update: UserUpdateDto = {};

    if (role.value !== this.user.role) {
      update.role = role.value;
    }

    if (password.value !== '') {
      update.password = password.value;
    }

    this.dialogRef.close(update);
  }

}
