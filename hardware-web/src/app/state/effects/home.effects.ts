import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HomeService } from '../../services';
import * as Action from '../actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

const getErrorMessage = (err: HttpErrorResponse): string => {
  return `${err.status} - ${err.message}`;
}

@Injectable()
export class HomeEffects {

  getHomeStatus$ = createEffect(() =>
    this.action$.pipe(
      ofType(Action.getHomeStatus),
      mergeMap(() =>
        this.homeService.getHomeStatus().pipe(
          map(status => Action.getHomeStatusSuccess({ status })),
          catchError((err: HttpErrorResponse) => of(Action.getHomeStatusFailure({
            error: getErrorMessage(err)
          }))),
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
          catchError((err: HttpErrorResponse) => of(Action.setHomeServerFailure({
            error: getErrorMessage(err)
          }))),
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
          catchError((err: HttpErrorResponse) => of(Action.disconnectHomeFailure({
            error: getErrorMessage(err)
          }))),
        )
      ),
    )
  );

  constructor(
    private action$: Actions,
    private homeService: HomeService,
  ) { }

}
