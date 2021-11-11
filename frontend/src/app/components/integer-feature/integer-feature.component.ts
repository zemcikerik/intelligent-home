import { Component } from '@angular/core';
import { BaseFeatureComponent } from '../base-feature.component';
import { IntegerFeature } from '../../models';

@Component({
  selector: 'app-integer-feature',
  templateUrl: './integer-feature.component.html',
  styleUrls: ['./integer-feature.component.scss']
})
export class IntegerFeatureComponent extends BaseFeatureComponent<IntegerFeature> {
}
