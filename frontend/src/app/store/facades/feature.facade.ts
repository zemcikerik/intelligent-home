import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeaturePartialState } from '../reducers';
import { Observable } from 'rxjs';
import { Feature } from '../../models';
import { selectAllFeatures } from '../selectors';

@Injectable()
export class FeatureFacade {

  getAllFeatures(): Observable<Feature[]> {
    return this.store$.select(selectAllFeatures);
  }

  constructor(
    private store$: Store<FeaturePartialState>
  ) { }

}
