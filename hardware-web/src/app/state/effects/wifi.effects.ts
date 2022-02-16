import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WifiService } from '../../services';
import * as Action from '../actions/wifi.actions';
import { catchError, filter, map, mergeMap, of } from 'rxjs';

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

  connect$ = createEffect(() =>
    this.action$.pipe(
      ofType(Action.connectWifi),
      mergeMap(({ connectInfo }) =>
        this.wifiService.connect(connectInfo).pipe(
          map(() => Action.connectWifiSuccess()),
          catchError(() => of(Action.connectWifiFailure({ error: '' }))),
        )
      ),
    )
  );

  disconnect$ = createEffect(() =>
    this.action$.pipe(
      ofType(Action.disconnectWifi),
      mergeMap(() =>
        this.wifiService.disconnect().pipe(
          map(() => Action.disconnectWifiSuccess()),
          catchError(() => of(Action.disconnectWifiFailure({ error: '' }))),
        )
      ),
    )
  );

  refreshStatus$ = createEffect(() =>
    this.action$.pipe(
      ofType(Action.connectWifiSuccess, Action.disconnectWifiSuccess),
      map(() => Action.getNetworkStatus()),
    )
  );

  loadAvailableNetworks$ = createEffect(() =>
    this.action$.pipe(
      ofType(Action.getNetworkStatusSuccess),
      filter(({ status }) => !status.connected),
      map(() => Action.getAvailableNetworks()),
    )
  );

  constructor(
    private action$: Actions,
    private wifiService: WifiService,
  ) { }

}
