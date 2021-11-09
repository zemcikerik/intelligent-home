import { Component } from '@angular/core';
import { BaseFeatureComponent } from '../base-feature.component';
import { ValueFeature } from '../../models';

@Component({
  selector: 'app-value-feature',
  templateUrl: './value-feature.component.html',
  styleUrls: ['./value-feature.component.scss']
})
export class ValueFeatureComponent extends BaseFeatureComponent<ValueFeature> {
}
