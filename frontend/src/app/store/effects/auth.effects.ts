import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { AuthService, ServerConnectionService, TokenStorageService } from '../../services';
import { map, mergeMap, tap } from 'rxjs/operators';
import { appAuthFailure, appAuthSuccess, appLogout } from '../actions';

@Injectable()
export class AuthEffects {

  auth$ = createEffect(() =>
    this.action$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => this.tokenStorageService.getToken()),
      map(token => {
        if (token) {
          const jwt = this.authService.parseToken(token);
          if (this.authService.isTokenValid(jwt)) {
            return appAuthSuccess({ jwt });
          }
        }
        return appAuthFailure();
      })
    )
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
