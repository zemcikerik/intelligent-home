import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feature } from '../models';
import { ServerConnectionService } from './server-connection.service';

@Injectable()
export class FeatureService {

  readonly featureAdd$: Observable<Feature>;
  readonly featureUpdate$: Observable<Feature>;
  readonly featureRemove$: Observable<string>;

  constructor(private serverConnectionService: ServerConnectionService) {
    this.featureAdd$ = serverConnectionService.watch<Feature>('/feature/add');
    this.featureUpdate$ = serverConnectionService.watch<Feature>('/feature/update');
    this.featureRemove$ = serverConnectionService.watch<string>('/feature/remove');
  }

  requestUpdate(id: string, update: object): void {
    this.serverConnectionService.send(`/feature/request-update/${id}`, update);
  }

}
