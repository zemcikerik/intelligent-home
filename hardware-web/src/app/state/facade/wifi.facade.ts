import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { WifiConnect, WifiNetwork, WifiStatus } from '../../models';
import { Store } from '@ngrx/store';
import { WifiPartialState } from '../reducers';
import { selectAvailableNetworks, selectWifiConnected, selectWifiLoading, selectWifiStatus } from '../selectors';
import { connectWifi, disconnectWifi, getNetworkStatus } from '../actions';

@Injectable()
export class WifiFacade {

  connect(connectInfo: WifiConnect): void {
    this.store$.dispatch(connectWifi({ connectInfo }));
  }

  disconnect(): void {
    this.store$.dispatch(disconnectWifi());
  }

  getNetworkStatus(): Observable<WifiStatus> {
    return this.selectIfNotNull(selectWifiStatus);
  }

  getAvailableNetworks(): Observable<WifiNetwork[]> {
    return this.selectIfNotNull(selectAvailableNetworks);
  }

  isConnected(): Observable<boolean> {
    return this.selectIfNotNull(selectWifiConnected);
  }

  isLoading(): Observable<boolean> {
    return this.store$.select(selectWifiLoading);
  }

  refresh(): void {
    this.store$.dispatch(getNetworkStatus());
  }

  private selectIfNotNull<T>(mapFn: (state: WifiPartialState) => T): Observable<NonNullable<T>> {
    return this.store$.select(mapFn).pipe(
      filter(value => !!value),
    ) as Observable<NonNullable<T>>;
  }

  constructor(private store$: Store<WifiPartialState>) {
  }

}
