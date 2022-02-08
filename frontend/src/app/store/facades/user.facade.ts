import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserPartialState } from '../reducers';
import { Observable } from 'rxjs';
import { UserCreateDto, UserDto, UserUpdateDto } from '../../dto';
import { selectAreUsersLoading, selectUserError, selectUsers } from '../selectors';
import { createUser, deleteUser, loadUsers, updateUser } from '../actions';

@Injectable()
export class UserFacade {

  getUsers(): Observable<UserDto[]> {
    return this.store$.select(selectUsers);
  }

  areUsersLoading(): Observable<boolean> {
    return this.store$.select(selectAreUsersLoading);
  }

  getUserError(): Observable<string | null> {
    return this.store$.select(selectUserError);
  }

  createUser(userCreationDto: UserCreateDto): void {
    this.store$.dispatch(createUser({ userCreationDto }));
  }

  updateUser(userId: number, userUpdateDto: UserUpdateDto): void {
    this.store$.dispatch(updateUser({ userId, userUpdateDto }));
  }

  deleteUser(userId: number): void {
    this.store$.dispatch(deleteUser({ userId }));
  }

  loadUsers(): void {
    this.store$.dispatch(loadUsers());
  }

  constructor(private store$: Store<UserPartialState>) {
  }

}
