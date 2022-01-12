import { Component, OnInit } from '@angular/core';
import { BaseFeatureComponent } from '../base-feature.component';
import { RgbFeature, RgbFeatureState } from '../../models';
import { Subject, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

@Component({
  selector: 'app-rgb-feature',
  templateUrl: './rgb-feature.component.html',
  styleUrls: ['./rgb-feature.component.scss']
})
export class RgbFeatureComponent extends BaseFeatureComponent<RgbFeature> implements OnInit{

    subject = new Subject<string>();
    debounced = this.subject.pipe(debounce(() => timer(500)));
    subscribe = this.debounced.subscribe(val => {
      const [r, g, b] = this.getSeparateValues(val);
      this.featureFacade.requestFeatureUpdate(this.id, { r: r, g: g, b: b });
    });
  
  setValue(event: Event): void {
    const element = event.target as HTMLInputElement;
    const value = element.value;
    this.subject.next(value);
  }

  getHexValue(state: RgbFeatureState): string{
    return `#${state.r.toString(16).padStart(2, '0')}${state.g.toString(16).padStart(2, '0')}${state.b.toString(16).padStart(2, '0')}`;
  }

  getSeparateValues(hex: string): [number, number, number]{
    const values =  hex.replace("#", "").match(/.{1,2}/g)?.map(num => Number("0x"+num)) ?? [0, 0, 0];
    return [values[0], values[1], values[2]];
  }
}
