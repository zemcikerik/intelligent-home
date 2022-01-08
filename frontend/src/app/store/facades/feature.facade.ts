import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeaturePartialState } from '../reducers';
import { Observable } from 'rxjs';
import { Feature, FeatureType } from '../../models';
import { selectAllFeatures, selectFeature, selectFeatureIdsByDeviceId, selectFeatureType } from '../selectors';
import { requestFeatureUpdate } from '../actions';

@Injectable()
export class FeatureFacade {

  getFeatures(): Observable<Feature[]> {
    return this.store$.select(selectAllFeatures);
  }

  getFeatureIdsForDevice(deviceId: string): Observable<string[]> {
    return this.store$.select(selectFeatureIdsByDeviceId(deviceId));
  }

  getFeatureById(featureId: string): Observable<Feature | undefined> {
    return this.store$.select(selectFeature(featureId));
  }

  getFeatureTypeById(featureId: string): Observable<FeatureType | undefined> {
    return this.store$.select(selectFeatureType(featureId));
  }

  requestFeatureUpdate(featureId: string, update: object): void {
    this.store$.dispatch(requestFeatureUpdate({ id: featureId, update }));
  }

  constructor(
    private store$: Store<FeaturePartialState>
  ) { }

}
