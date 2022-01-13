import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InitialClientState } from '../models';
import { SERVER_URL_TOKEN } from './server-url.token';

@Injectable()
export class InitialStateService {

  constructor(
    private httpClient: HttpClient,
    @Inject(SERVER_URL_TOKEN) private serverUrl: string
  ) { }

  getInitialState(): Observable<InitialClientState> {
    const url = `${this.serverUrl}/client/current-state`;
    return this.httpClient.get<InitialClientState>(url);
  }

}
