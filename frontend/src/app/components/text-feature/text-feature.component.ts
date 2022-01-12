import { Component } from '@angular/core';
import { BaseFeatureComponent } from "../base-feature.component";
import { TextFeature } from "../../models";

@Component({
  selector: 'app-text-feature',
  templateUrl: './text-feature.component.html',
  styleUrls: ['./text-feature.component.scss']
})
export class TextFeatureComponent extends BaseFeatureComponent<TextFeature>{
  setText(event: Event, oldText: string) {
    const element = event.target as HTMLInputElement;
    const text = element.value;
    element.value = oldText;
    this.featureFacade.requestFeatureUpdate(this.id, { text });
  }
}
