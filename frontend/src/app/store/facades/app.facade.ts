import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppPartialState } from '../reducers';
import { Observable } from 'rxjs';
import { selectAppError, selectAppLoading, selectAppPhase } from '../selectors';
import { AppPhase } from '../../app-phase.enum';

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

  constructor(
    private store$: Store<AppPartialState>
  ) { }

}
