import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginPartialState } from '../reducers';
import { Observable } from 'rxjs';
import { selectLoginError, selectLoginLoading } from '../selectors';
import { login } from '../actions';

@Injectable()
export class LoginFacade {

  isLoginLoading(): Observable<boolean> {
    return this.store$.select(selectLoginLoading);
  }

  getLoginError(): Observable<string | null> {
    return this.store$.select(selectLoginError);
  }

  login(username: string, password: string): void {
    this.store$.dispatch(login({ username, password }));
  }

  constructor(
    private store$: Store<LoginPartialState>
  ) { }

}
