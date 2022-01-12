import { Component } from '@angular/core';
import { BaseFeatureComponent } from '../base-feature.component';
import { ButtonFeature } from '../../models';

@Component({
  selector: 'app-button-feature',
  templateUrl: './button-feature.component.html',
  styleUrls: ['./button-feature.component.scss']
})
export class ButtonFeatureComponent extends BaseFeatureComponent<ButtonFeature> {

  onClick(): void {
    this.featureFacade.requestFeatureUpdate(this.id, { press: true });
  }

}
