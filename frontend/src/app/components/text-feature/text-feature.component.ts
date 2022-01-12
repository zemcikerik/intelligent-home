import { Component } from '@angular/core';
import { BaseFeatureComponent } from '../base-feature.component';
import { TextFeature } from '../../models';

@Component({
  selector: 'app-text-feature',
  templateUrl: './text-feature.component.html',
  styleUrls: ['./text-feature.component.scss']
})
export class TextFeatureComponent extends BaseFeatureComponent<TextFeature> {
}
