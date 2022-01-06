import { Component } from '@angular/core';
import { BaseFeatureComponent } from '../base-feature.component';
import { DropdownFeature } from '../../models';

@Component({
  selector: 'app-dropdown-feature',
  templateUrl: './dropdown-feature.component.html',
  styleUrls: ['./dropdown-feature.component.scss']
})
export class DropdownFeatureComponent extends BaseFeatureComponent<DropdownFeature> {

  setSelection(selected: string): void {
    this.featureFacade.requestFeatureUpdate(this.id, { selected });
  }

}
