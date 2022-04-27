import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { from, mergeMap } from 'rxjs';
import { getHomeStatus, getNetworkStatus } from '../actions';

@Injectable()
export class AppEffects {

  init$ = createEffect(() =>
    this.action$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      mergeMap(() => from([getNetworkStatus(), getHomeStatus()])),
    )
  );

  constructor(private action$: Actions) {
  }

}
