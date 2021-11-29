import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import {
  appEstablishConnection,
  appLoadingFailure,
  appLoadingSuccess,
  loadDevicesSuccess,
  loadFeaturesSuccess
} from '../actions';
import { InitialStateService, ServerConnectionService } from '../../services';
import { from, of } from 'rxjs';

@Injectable()
export class AppEffects {

  init$ = createEffect(() =>
    this.action$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      mergeMap(() =>
        this.initialStateService.getInitialState().pipe(
          switchMap(({ devices, features }) => from([
            appEstablishConnection(),
            loadDevicesSuccess({ devices }),
            loadFeaturesSuccess({ features })
          ])),
          catchError(() => of(appLoadingFailure({ error: 'There was an error obtaining initial state from server!' })))
        )
      )
    )
  );

  // TODO: this logic needs refactoring after we figure out sending messages to specific client
  establishConnection$ = createEffect(() =>
    this.action$.pipe(
      ofType(appEstablishConnection),
      mergeMap(() =>
        this.serverConnectionService.connect().pipe(
          map(() => appLoadingSuccess()),
          catchError(() => of(appLoadingFailure({ error: 'There was an error establishing connection to the server!' })))
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private initialStateService: InitialStateService,
    private serverConnectionService: ServerConnectionService
  ) { }

}
