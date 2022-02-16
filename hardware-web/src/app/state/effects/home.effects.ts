import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HomeService } from '../../services';
import * as Action from '../actions';
import { catchError, map, mergeMap, of } from 'rxjs';

// TODO: error handling

@Injectable()
export class HomeEffects {

  getHomeStatus$ = createEffect(() =>
    this.action$.pipe(
      ofType(Action.getHomeStatus),
      mergeMap(() =>
        this.homeService.getHomeStatus().pipe(
          map(status => Action.getHomeStatusSuccess({ status })),
          catchError(() => of(Action.getHomeStatusFailure({ error: '' }))),
        )
      ),
    )
  );

  setHomeServer$ = createEffect(() =>
    this.action$.pipe(
      ofType(Action.setHomeServer),
      mergeMap(({ server }) =>
        this.homeService.setServerInfo(server).pipe(
          map(() => Action.setHomeServerSuccess()),
          catchError(() => of(Action.setHomeServerFailure({ error: '' }))),
        )
      ),
    )
  );

  disconnectHome$ = createEffect(() =>
    this.action$.pipe(
      ofType(Action.disconnectHome),
      mergeMap(() =>
        this.homeService.disconnect().pipe(
          map(() => Action.disconnectHomeSuccess()),
          catchError(() => of(Action.setHomeServerFailure({ error: '' }))),
        )
      ),
    )
  );

  constructor(
    private action$: Actions,
    private homeService: HomeService,
  ) { }

}
