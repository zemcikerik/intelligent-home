import { createAction, props } from '@ngrx/store';
import { Feature } from '../../models';

export const loadFeaturesSuccess = createAction('[Feature] Load Features Success', props<{ features: Feature[] }>());
