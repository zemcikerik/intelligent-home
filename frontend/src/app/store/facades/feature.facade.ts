import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeaturePartialState } from '../reducers';
import { Observable, of } from 'rxjs';
import { Feature } from '../../models';
import { selectAllFeatures } from '../selectors';

@Injectable()
export class FeatureFacade {

  getAllFeatures(): Observable<Feature[]> {
    return this.store$.select(selectAllFeatures);
  }

  getFeaturesForDevice(deviceId: string): Observable<Feature[]> {
    return of([
      { id: 'aaa-aa-a', deviceId: 'fadsfdasfds', name: 'Feature 1' },
      { id: 'aaa-ba-a', deviceId: 'fadsfdasfds', name: 'Feature 2' },
      { id: 'aaa-ac-a', deviceId: 'fadsfdasfds', name: 'Feature 3' },
    ]);
  }

  constructor(
    private store$: Store<FeaturePartialState>
  ) { }

}
