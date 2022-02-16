import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WifiService } from '../../services';
import * as Action from '../actions/wifi.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

// TODO: error messages

@Injectable()
export class WifiEffects {

  getNetworkStatus$ = createEffect(() =>
    this.action$.pipe(
      ofType(Action.getNetworkStatus),
      mergeMap(() =>
        this.wifiService.getConnectionStatus().pipe(
          map(status => Action.getNetworkStatusSuccess({ status })),
          catchError(() => of(Action.getNetworkStatusFailure({ error: '' }))),
        )
      ),
    )
  );

  getAvailableNetworks$ = createEffect(() =>
    this.action$.pipe(
      ofType(Action.getAvailableNetworks),
      mergeMap(() =>
        this.wifiService.getAvailableNetworks().pipe(
          map(networks => Action.getAvailableNetworksSuccess({ networks })),
          catchError(() => of(Action.getAvailableNetworksError({ error: '' }))),
        )
      ),
    )
  );

  constructor(
    private action$: Actions,
    private wifiService: WifiService,
  ) { }

}
