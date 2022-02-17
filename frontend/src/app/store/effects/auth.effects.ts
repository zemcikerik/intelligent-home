import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { AuthService, ServerConnectionService, TokenStorageService } from '../../services';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { appAuthFailure, appAuthSuccess, appLogout, loginSuccess } from '../actions';
import { of, throwError } from 'rxjs';

@Injectable()
export class AuthEffects {

  auth$ = createEffect(() =>
    this.action$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => this.tokenStorageService.getToken()),
      mergeMap(token => {
        if (!token) {
          return throwError('');
        }

        const refreshToken = (refreshToken: string) => this.authService.refresh(refreshToken).pipe(
          map(token => loginSuccess({ token }))
        );

        const jwt = this.authService.parseToken(token);

        return !this.authService.isTokenValid(jwt)
          ? refreshToken(jwt.refreshToken)
          : of(appAuthSuccess({ jwt }));
      }),
      catchError(() => of(appAuthFailure())),
    ),
  );

  authFailure$ = createEffect(() =>
    this.action$.pipe(
      ofType(appAuthFailure),
      tap(() => this.tokenStorageService.eraseToken())
    ), { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.action$.pipe(
      ofType(appLogout),
      tap(() => this.tokenStorageService.eraseToken()),
      mergeMap(() => this.serverConnectionService.disconnect())
    ), { dispatch: false }
  )

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private serverConnectionService: ServerConnectionService,
  ) { }

}
