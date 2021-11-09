import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { FeatureType } from '../../models';
import { FeatureFacade } from '../../store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {

  @Input() id = '';
  featureType$: Observable<FeatureType | undefined> = EMPTY;

  constructor(
    private featureFacade: FeatureFacade
  ) { }

  ngOnInit(): void {
    // TODO: add custom selector for this
    this.featureType$ = this.featureFacade.getFeatureById(this.id).pipe(
      map(feature => feature?.type)
    );
  }

}
