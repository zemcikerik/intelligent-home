import { Injectable } from '@angular/core';
import { FeatureService } from '../../services';
import { createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { addFeature, removeFeature, updateFeature } from '../actions';

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

  constructor(
    private featureService: FeatureService
  ) { }

}
