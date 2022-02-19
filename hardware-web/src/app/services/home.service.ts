import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { HomeState, HomeStatus, ServerInfo } from '../models';

@Injectable()
export class HomeService {

  constructor(private httpClient: HttpClient) {
  }

  getHomeStatus(): Observable<HomeStatus> {
    // return this.httpClient.get<HomeStatus>('/api/home');
    return this.ofWithDelay({
      state: HomeState.WAITING_FOR_SERVER_INFO,
      hasServerInfo: false,
      serverInfo: {
        hostname: '192.168.0.1',
        port: 8080,
        path: '/ws',
      },
    });
  }

  setServerInfo(serverInfo: ServerInfo): Observable<any> {
    // return this.httpClient.post('/api/home', serverInfo);
    return this.ofWithDelay(null);
  }

  disconnect(): Observable<any> {
    // return this.httpClient.delete('/api/home');
    return this.ofWithDelay(null);
  }

  ofWithDelay<T>(value: T, delayMs: number = 3000): Observable<T> {
    return of(value).pipe(
      delay(delayMs)
    );
  }

}
