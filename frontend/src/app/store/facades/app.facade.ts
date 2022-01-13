import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppPartialState } from '../reducers';
import { Observable } from 'rxjs';
import { selectAppError, selectAppLoading } from '../selectors';

@Injectable()
export class AppFacade {

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
