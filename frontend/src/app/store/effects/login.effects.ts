import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService, TokenStorageService } from '../../services';
import { appAuthSuccess, login, loginFailure, loginSuccess } from '../actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {

  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(login),
      mergeMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map(token => loginSuccess({ token })),
          catchError((err: HttpErrorResponse) => of(loginFailure({ error: err.message })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.action$.pipe(
      ofType(loginSuccess),
      tap(({ token })  => this.tokenStorageService.setToken(token)),
      map(({ token }) => this.authService.parseToken(token)),
      map(jwt => appAuthSuccess({ jwt }))
    )
  );

  // enforces that device list is displayed after login
  redirectOnLogin$ = createEffect(() =>
    this.action$.pipe(
      ofType(loginSuccess),
      mergeMap(() => this.router.navigateByUrl(''))
    ), { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) { }

}
