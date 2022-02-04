import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services';
import { catchError, filter, map, mergeMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import * as Action from '../actions';
import { routerNavigatedAction } from '@ngrx/router-store';

// TODO: handle error messages

@Injectable()
export class UserEffects {

  firstNavigation$ = createEffect(() =>
    this.action$.pipe(
      ofType(routerNavigatedAction),
      filter(({ payload }) => payload.event.urlAfterRedirects === '/users'),
      take(1),
      map(() => Action.loadUsers()),
    )
  );

  loadUsers$ = createEffect(() =>
    this.action$.pipe(
      ofType(Action.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map(users => Action.loadUsersSuccess({ users })),
          catchError(() => of(Action.loadUsersFailure({ error: '' }))),
        )
      ),
    )
  );

  createUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(Action.createUser),
      mergeMap(({ userCreationDto }) =>
        this.userService.createUser(userCreationDto).pipe(
          map(user => Action.createUserSuccess({ user })),
          catchError(() => of(Action.createUserFailure({ error: '' }))),
        )
      ),
    )
  );

  updateUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(Action.updateUser),
      mergeMap(({ userId, userUpdateDto }) =>
        this.userService.updateUser(userId, userUpdateDto).pipe(
          map(user => Action.updateUserSuccess({ user })),
          catchError(() => of(Action.updateUserFailure({ error: '' }))),
        )
      ),
    )
  );

  deleteUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(Action.deleteUser),
      mergeMap(({ userId }) =>
        this.userService.deleteUser(userId).pipe(
          map(() => Action.deleteUserSuccess({ userId })),
          catchError((err: HttpErrorResponse) => of(Action.deleteUserFailure({ error: err.message }))),
        )
      ),
    )
  );

  constructor(
    private action$: Actions,
    private userService: UserService,
  ) { }

}
