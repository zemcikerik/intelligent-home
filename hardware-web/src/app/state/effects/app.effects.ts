import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { map } from 'rxjs';
import { getNetworkStatus } from '../actions';

@Injectable()
export class AppEffects {

  init$ = createEffect(() =>
    this.action$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => getNetworkStatus()),
    )
  );

  constructor(private action$: Actions) {
  }

}
