import { Injectable } from '@angular/core';
import { Actions as NgrxActions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { InitialStateService, ServerConnectionService } from '../../services';
import { from, of } from 'rxjs';
import * as Actions from '../actions';
import { Router } from '@angular/router';

const CONNECT_ERROR = 'There was an error establishing connection to the server!';
const LOAD_ERROR = 'There was an error obtaining initial state from server!';

@Injectable()
export class AppEffects {

  init$ = createEffect(() =>
    this.action$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      mergeMap(() => this.router.navigateByUrl('/')),
    ), { dispatch: false }
  );

  connect$ = createEffect(() =>
    this.action$.pipe(
      ofType(Actions.appAuthSuccess),
      mergeMap(() =>
        this.serverConnectionService.connect().pipe(
          map(() => Actions.appConnectSuccess()),
          catchError(() => of(Actions.appConnectFailure({ error: CONNECT_ERROR })))
        )
      )
    )
  );

  load$ = createEffect(() =>
    this.action$.pipe(
      ofType(Actions.appConnectSuccess),
      mergeMap(() =>
        this.initialStateService.getInitialState().pipe(
          switchMap(({ devices, features }) => from([
            Actions.loadDevices({ devices }),
            Actions.loadFeatures({ features }),
            Actions.appLoadSuccess(),
          ])),
          catchError(() => of(Actions.appLoadFailure({ error: LOAD_ERROR })))
        )
      )
    )
  );

  constructor(
    private action$: NgrxActions,
    private initialStateService: InitialStateService,
    private serverConnectionService: ServerConnectionService,
    private router: Router,
  ) { }

}
