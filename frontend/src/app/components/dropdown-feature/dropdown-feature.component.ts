import { Component } from '@angular/core';
import { BaseFeatureComponent } from '../base-feature.component';
import { DropdownFeature } from '../../models';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-dropdown-feature',
  templateUrl: './dropdown-feature.component.html',
  styleUrls: ['./dropdown-feature.component.scss']
})
export class DropdownFeatureComponent extends BaseFeatureComponent<DropdownFeature> {

  setSelection(event: MatSelectChange, oldSelected: any): void {
    event.source.writeValue(oldSelected);
    this.featureFacade.requestFeatureUpdate(this.id, { selected: event.value });
  }

}
