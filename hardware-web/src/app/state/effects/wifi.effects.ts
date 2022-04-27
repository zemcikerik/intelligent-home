import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WifiService } from '../../services';
import * as Action from '../actions/wifi.actions';
import { catchError, filter, map, mergeMap, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

const getErrorMessage = (err: HttpErrorResponse): string => {
  return `${err.status} - ${err.message}`;
}

@Injectable()
export class WifiEffects {

  getNetworkStatus$ = createEffect(() =>
    this.action$.pipe(
      ofType(Action.getNetworkStatus),
      mergeMap(() =>
        this.wifiService.getConnectionStatus().pipe(
          map(status => Action.getNetworkStatusSuccess({ status })),
          catchError((err: HttpErrorResponse) => of(Action.getNetworkStatusFailure({
            error: getErrorMessage(err)
          }))),
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
          catchError((err: HttpErrorResponse) => of(Action.getAvailableNetworksError({
            error: getErrorMessage(err)
          }))),
        )
      ),
    )
  );

  connectWifi$ = createEffect(() =>
    this.action$.pipe(
      ofType(Action.connectWifi),
      mergeMap(({ connectInfo }) =>
        this.wifiService.connect(connectInfo).pipe(
          map(() => Action.connectWifiSuccess()),
          catchError((err: HttpErrorResponse) => of(Action.connectWifiFailure({
            error: getErrorMessage(err)
          }))),
        )
      ),
    )
  );

  disconnectWifi$ = createEffect(() =>
    this.action$.pipe(
      ofType(Action.disconnectWifi),
      mergeMap(() =>
        this.wifiService.disconnect().pipe(
          map(() => Action.disconnectWifiSuccess()),
          catchError((err: HttpErrorResponse) => of(Action.disconnectWifiFailure({
            error: getErrorMessage(err)
          }))),
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
