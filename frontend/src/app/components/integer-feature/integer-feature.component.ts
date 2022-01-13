import { Component } from '@angular/core';
import { BaseFeatureComponent } from '../base-feature.component';
import { IntegerFeature } from '../../models';

@Component({
  selector: 'app-integer-feature',
  templateUrl: './integer-feature.component.html',
  styleUrls: ['./integer-feature.component.scss']
})
export class IntegerFeatureComponent extends BaseFeatureComponent<IntegerFeature> {

  setValue(event: Event, oldValue: number): void {
    const element = event.target as HTMLInputElement;
    const value = element.valueAsNumber;
    element.valueAsNumber = oldValue;
    this.featureFacade.requestFeatureUpdate(this.id, { value });
  }

}
