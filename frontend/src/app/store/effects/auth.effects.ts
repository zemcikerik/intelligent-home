import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { TokenStorageService } from '../../services';
import { map, tap } from 'rxjs/operators';
import { appAuthFailure } from '../actions';

@Injectable()
export class AuthEffects {

  auth$ = createEffect(() =>
    this.action$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => appAuthFailure())
    )
  );

  authFailure$ = createEffect(() =>
    this.action$.pipe(
      ofType(appAuthFailure),
      tap(() => this.tokenStorageService.eraseToken())
    ), { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private tokenStorageService: TokenStorageService,
  ) { }

}
