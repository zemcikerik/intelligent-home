import { Component } from '@angular/core';
import { BaseFeatureComponent } from '../base-feature.component';
import { BooleanFeature } from '../../models';

@Component({
  selector: 'app-boolean-feature',
  templateUrl: './boolean-feature.component.html',
  styleUrls: ['./boolean-feature.component.scss']
})
export class BooleanFeatureComponent extends BaseFeatureComponent<BooleanFeature> {

  setEnabled(enabled: boolean): void {
    // TODO: don't toggle switch immediately
    this.featureFacade.requestFeatureUpdate(this.id, { enabled });
  }

}
