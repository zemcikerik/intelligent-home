import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserCreateDto, UserDto, UserUpdateDto } from '../../dto';
import { UserFacade } from '../../store';
import { MatDialog } from '@angular/material/dialog';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { UserCreateDialogComponent } from '../user-create-dialog/user-create-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnDestroy {

  users$: Observable<UserDto[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  private unsubscribe$ = new Subject();

  constructor(
    private matDialog: MatDialog,
    private userFacade: UserFacade,
  ) {
    this.users$ = userFacade.getUsers();
    this.loading$ = userFacade.areUsersLoading();
    this.error$ = userFacade.getUserError();
  }

  createUser(): void {
    this.matDialog.open(UserCreateDialogComponent).afterClosed().pipe(
      takeUntil(this.unsubscribe$),
      filter((data?: UserCreateDto) => !!data),
      tap(data => this.userFacade.createUser(data!)),
    ).subscribe();
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
