import { Component } from '@angular/core';
import { BaseFeatureComponent } from '../base-feature.component';
import { BooleanFeature } from '../../models';

@Component({
  selector: 'app-boolean-feature',
  templateUrl: './boolean-feature.component.html',
  styleUrls: ['./boolean-feature.component.scss']
})
export class BooleanFeatureComponent extends BaseFeatureComponent<BooleanFeature> {

  onClick(event: MouseEvent, enabled: boolean): void {
    event.preventDefault();
    this.featureFacade.requestFeatureUpdate(this.id, { enabled });
  }

}
