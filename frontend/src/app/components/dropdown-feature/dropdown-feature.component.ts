import { Component } from '@angular/core';
import { BaseFeatureComponent } from '../base-feature.component';
import { DropdownFeature, DropdownFeatureState } from '../../models';

@Component({
  selector: 'app-dropdown-feature',
  templateUrl: './dropdown-feature.component.html',
  styleUrls: ['./dropdown-feature.component.scss']
})
export class DropdownFeatureComponent extends BaseFeatureComponent<DropdownFeature> {

  getSelection(choices: DropdownFeatureState): string | null {
    for (const choice in choices) {
      if (choices[choice]) {
        return choice;
      }
    }
    return null;
  }

  setSelection(choice: string): void {
    this.featureFacade.requestFeatureUpdate(this.id, { [choice]: true });
  }

}
