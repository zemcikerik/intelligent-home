import { Component, Input, OnInit } from '@angular/core';
import { FeatureFacade } from '../../store';
import { EMPTY, Observable } from 'rxjs';

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
    this.featureIds$ = this.featureFacade.getFeatureIdsForDevice(this.deviceId);
  }

}
