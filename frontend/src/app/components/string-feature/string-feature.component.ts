import { Component } from '@angular/core';
import { BaseFeatureComponent } from '../base-feature.component';
import { StringFeature } from '../../models';

@Component({
  selector: 'app-string-feature',
  templateUrl: './string-feature.component.html',
  styleUrls: ['./string-feature.component.scss']
})
export class StringFeatureComponent extends BaseFeatureComponent<StringFeature> {

  setText(event: Event, oldText: string) {
    const element = event.target as HTMLInputElement;
    const text = element.value;
    element.value = oldText;
    this.featureFacade.requestFeatureUpdate(this.id, { text });
  }

}
