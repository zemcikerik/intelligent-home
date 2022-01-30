import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppPartialState } from '../reducers';
import { Observable } from 'rxjs';
import { selectAppError, selectAppLoading, selectAppPhase, selectHasAuthority } from '../selectors';
import { AppPhase } from '../../app-phase.enum';
import { appLogout } from '../actions';
import { Authority } from '../../models';

@Injectable()
export class AppFacade {

  getAppPhase(): Observable<AppPhase> {
    return this.store$.select(selectAppPhase);
  }

  getAppError(): Observable<string | null> {
    return this.store$.select(selectAppError);
  }

  isAppLoading(): Observable<boolean> {
    return this.store$.select(selectAppLoading);
  }

  hasAuthority(authority: Authority): Observable<boolean> {
    return this.store$.select(selectHasAuthority(authority));
  }

  logout(): void {
    this.store$.dispatch(appLogout());
  }

  constructor(
    private store$: Store<AppPartialState>
  ) { }

}
