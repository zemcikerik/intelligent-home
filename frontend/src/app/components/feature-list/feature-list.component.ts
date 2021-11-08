import { Component, Input, OnInit } from '@angular/core';
import { FeatureFacade } from '../../store';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements OnInit {

  @Input() deviceId = '';
  featureIds$: Observable<string[]> = EMPTY;

  constructor(
    private featureFacade: FeatureFacade
  ) { }

  ngOnInit(): void {
    // TODO: create special selector for this
    this.featureIds$ = this.featureFacade.getFeaturesForDevice(this.deviceId).pipe(
      map(features => features.map(feature => feature.id))
    );
  }

}
