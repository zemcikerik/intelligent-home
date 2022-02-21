import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAppError } from '../selectors';

@Injectable()
export class AppFacade {

  getError(): Observable<string | null> {
    return this.store$.select(selectAppError);
  }

  constructor(private store$: Store) {
  }

}
