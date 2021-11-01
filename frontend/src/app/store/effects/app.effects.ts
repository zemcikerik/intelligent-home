import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { delay, map } from 'rxjs/operators';
import { appLoadingSuccess } from '../actions';

@Injectable()
export class AppEffects {

  init$ = createEffect(() =>
    this.action$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      delay(2000),
      map(() => appLoadingSuccess())
    )
  );

  constructor(
    private action$: Actions
  ) { }

}
