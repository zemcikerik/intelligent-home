import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Feature } from '../../models';
import { FeatureFacade } from '../../store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {

  @Input() id = '';
  feature$: Observable<Feature | undefined> = EMPTY;

  constructor(
    private featureFacade: FeatureFacade
  ) { }

  ngOnInit(): void {
    this.feature$ = this.featureFacade.getFeatureById(this.id).pipe(tap(console.log));
  }

}
