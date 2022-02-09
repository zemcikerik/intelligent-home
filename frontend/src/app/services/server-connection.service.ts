import { Inject, Injectable, InjectionToken } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { RxStomp, RxStompConfig } from '@stomp/rx-stomp';
import { catchError, map, take, timeout } from 'rxjs/operators';
import { PRODUCTION_TOKEN } from '../production.token';
import { TokenStorageService } from './token-storage.service';

export const WS_SERVER_URL_TOKEN = new InjectionToken<string>('WS_SERVER_URL');

@Injectable()
export class ServerConnectionService {

  stomp = new RxStomp();

  constructor(
    private tokenStorageService: TokenStorageService,
    @Inject(WS_SERVER_URL_TOKEN) private wsServerUrl: string,
    @Inject(PRODUCTION_TOKEN) private production: boolean
  ) { }

  connect(): Observable<any> {
    const config: RxStompConfig = {
      brokerURL: this.wsServerUrl,
      reconnectDelay: 200,
      connectHeaders: {
        Authorization: `Bearer ${this.tokenStorageService.getToken()}`
      }
    };

    if (!this.production) {
      config.debug = console.log;
    }

    this.stomp.configure(config);
    this.stomp.activate();

    return this.stomp.connected$.pipe(
      take(1),
      timeout(5000),
      catchError(err => {
        // not awaiting as it's not needed when connection was not established
        // noinspection JSIgnoredPromiseFromCall
        this.stomp.deactivate();
        return throwError(err);
      })
    );
  }

  disconnect(): Observable<any> {
    return from(this.stomp.deactivate());
  }

  send(destination: string, content: object): void {
    this.stomp.publish({ destination: `/app/client${destination}`, body: JSON.stringify(content) });
  }

  watch<T = object | string | number>(path: string): Observable<T> {
    return this.stomp.watch(`/topic/client${path}`).pipe(
      map(message => JSON.parse(message.body) as T)
    );
  }

}
