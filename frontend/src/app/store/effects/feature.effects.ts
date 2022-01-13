import { Injectable } from '@angular/core';
import { FeatureService } from '../../services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { addFeature, removeFeature, requestFeatureUpdate, updateFeature } from '../actions';

@Injectable()
export class FeatureEffects {

  featureAdd$ = createEffect(() =>
    this.featureService.featureAdd$.pipe(
      map(feature => addFeature({ feature }))
    )
  );

  featureUpdate$ = createEffect(() =>
    this.featureService.featureUpdate$.pipe(
      map(feature => updateFeature({ feature }))
    )
  );

  featureRemove$ = createEffect(() =>
    this.featureService.featureRemove$.pipe(
      map(featureId => removeFeature({ featureId }))
    )
  );

  requestFeatureUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestFeatureUpdate),
      tap(({ id, update }) => this.featureService.requestUpdate(id, update))
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private featureService: FeatureService
  ) { }

}
