import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { appLoadingFailure, appLoadingSuccess } from '../actions';
import { ServerConnectionService } from '../../services';
import { of } from 'rxjs';

@Injectable()
export class AppEffects {

  init$ = createEffect(() =>
    this.action$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      mergeMap(() =>
        this.serverConnectionService.connect().pipe(
          map(() => appLoadingSuccess()),
          catchError(() => of(appLoadingFailure({ error: 'There was an error trying to connect to server!' })))
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private serverConnectionService: ServerConnectionService
  ) { }

}
