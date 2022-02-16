import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HomePartialState } from '../reducers';
import { disconnectHome, getHomeStatus, setHomeServer } from '../actions';
import { filter, Observable } from 'rxjs';
import { selectHomeError, selectHomeStatus, selectIsHomeLoading } from '../selectors/home.selectors';
import { HomeStatus, ServerInfo } from '../../models';

@Injectable()
export class HomeFacade {

  disconnect(): void {
    this.store$.dispatch(disconnectHome());
  }

  getError(): Observable<string | null> {
    return this.store$.select(selectHomeError);
  }

  getStatus(): Observable<HomeStatus> {
    return this.store$.select(selectHomeStatus).pipe(
      filter(status => !!status),
    ) as Observable<HomeStatus>;
  }

  isLoading(): Observable<boolean> {
    return this.store$.select(selectIsHomeLoading);
  }

  refresh(): void {
    this.store$.dispatch(getHomeStatus());
  }

  setHomeServer(serverInfo: ServerInfo): void {
    this.store$.dispatch(setHomeServer({ server: serverInfo }));
  }

  constructor(private store$: Store<HomePartialState>) {
  }

}
