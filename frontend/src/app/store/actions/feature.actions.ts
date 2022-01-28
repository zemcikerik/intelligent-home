import { createAction, props } from '@ngrx/store';
import { Feature } from '../../models';

export const addFeature = createAction('[Feature] Add Feature', props<{ feature: Feature }>());
export const loadFeatures = createAction('[Feature] Load Features', props<{ features: Feature[] }>());
export const updateFeature = createAction('[Feature] Update Feature', props<{ feature: Feature }>());
export const removeFeature = createAction('[Feature] Remove Feature', props<{ featureId: string }>());

export const requestFeatureUpdate = createAction('[Feature] Request Feature Update', props<{ id: string, update: object }>());
