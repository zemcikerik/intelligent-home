import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feature } from '../models';
import { ServerConnectionService } from './server-connection.service';

@Injectable()
export class FeatureService {

  readonly featureAdd$: Observable<Feature>;
  readonly featureRemove$: Observable<string>;

  constructor(serverConnectionService: ServerConnectionService) {
    this.featureAdd$ = serverConnectionService.watch<Feature>('/feature/add');
    this.featureRemove$ = serverConnectionService.watch<string>('/feature/remove');
  }

}
