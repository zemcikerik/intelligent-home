import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserPartialState } from '../reducers';
import { Observable } from 'rxjs';
import { UserCreateDto, UserDto, UserUpdateDto } from '../../dto';
import { selectAreUsersInitialized, selectAreUsersLoading, selectUserError, selectUsers } from '../selectors';
import { createUser, deleteUser, resetUsers, updateUser } from '../actions';

@Injectable()
export class UserFacade {

  getUsers(): Observable<UserDto[]> {
    return this.store$.select(selectUsers);
  }

  areUsersInitialized(): Observable<boolean> {
    return this.store$.select(selectAreUsersInitialized);
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

  resetUsers(): void {
    this.store$.dispatch(resetUsers());
  }

  constructor(private store$: Store<UserPartialState>) {
  }

}
