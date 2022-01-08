import { Component, Input, OnInit } from '@angular/core';
import { BaseFeature } from '../models';
import { EMPTY, Observable } from 'rxjs';
import { FeatureFacade } from '../store';
import { filter } from 'rxjs/operators';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({ template: '' })
export class BaseFeatureComponent<T extends BaseFeature> implements OnInit {

  @Input() id = '';
  feature$: Observable<T> = EMPTY;

  constructor(
    protected featureFacade: FeatureFacade
  ) { }

  ngOnInit(): void {
    this.feature$ = this.featureFacade.getFeatureById(this.id).pipe(
      filter(feature => !!feature)
    ) as Observable<T>;
  }

}
