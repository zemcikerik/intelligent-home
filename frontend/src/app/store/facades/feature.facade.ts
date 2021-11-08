import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeaturePartialState } from '../reducers';
import { Observable, of } from 'rxjs';
import { Feature } from '../../models';
import { selectAllFeatures, selectFeature, selectFeatureIdsByDeviceId } from '../selectors';

@Injectable()
export class FeatureFacade {

  getAllFeatures(): Observable<Feature[]> {
    return this.store$.select(selectAllFeatures);
  }

  getFeaturesForDevice(deviceId: string): Observable<Feature[]> {
    return this.store$.select(selectFeatureIdsByDeviceId(deviceId));
  }

  getFeatureById(featureId: string): Observable<Feature | undefined> {
    return this.store$.select(selectFeature(featureId));
  }

  constructor(
    private store$: Store<FeaturePartialState>
  ) { }

}
