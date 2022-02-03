import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserDto, UserUpdateDto } from '../../dto';
import { UserFacade } from '../../store';
import { MatDialog } from '@angular/material/dialog';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { filter, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {

  users$: Observable<UserDto[]>;
  private unsubscribe$ = new Subject();

  constructor(
    private matDialog: MatDialog,
    private userFacade: UserFacade,
  ) {
    this.users$ = userFacade.getUsers();
  }

  ngOnInit(): void {
    this.userFacade.loadUsers();
  }

  editUser(user: UserDto): void {
    this.matDialog.open(UserEditDialogComponent, { data: user }).afterClosed().pipe(
      takeUntil(this.unsubscribe$),
      filter((update?: UserUpdateDto) => !!update),
      tap(update => this.userFacade.updateUser(user.id, update!)),
    ).subscribe();
  }

  deleteUser(user: UserDto): void {
    this.userFacade.deleteUser(user.id);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
