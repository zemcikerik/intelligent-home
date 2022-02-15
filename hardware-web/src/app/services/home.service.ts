import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { HomeState, HomeStatus, ServerInfo } from '../models';

@Injectable()
export class HomeService {

  constructor(private httpClient: HttpClient) {
  }

  getHomeStatus(): Observable<HomeStatus> {
    return this.ofWithDelay({
      state: HomeState.CONNECTING,
      hasServerInfo: true,
      serverInfo: {
        hostname: '192.168.0.1',
        port: 8080,
        path: '/ws',
      },
    });
  }

  setServerInfo(serverInfo: ServerInfo) {
    return this.ofWithDelay(null);
  }

  disconnect(): Observable<any> {
    return this.ofWithDelay(null);
  }

  ofWithDelay<T>(value: T, delayMs: number = 3000): Observable<T> {
    return of(value).pipe(
      delay(delayMs)
    );
  }

}
