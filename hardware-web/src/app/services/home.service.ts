import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeStatus, ServerInfo } from '../models';

@Injectable()
export class HomeService {

  constructor(private httpClient: HttpClient) {
  }

  getHomeStatus(): Observable<HomeStatus> {
    return this.httpClient.get<HomeStatus>('/api/home');
  }

  setServerInfo(serverInfo: ServerInfo): Observable<any> {
    return this.httpClient.post('/api/home', serverInfo);
  }

  disconnect(): Observable<any> {
    return this.httpClient.delete('/api/home');
  }

}
