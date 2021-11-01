import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { RxStomp } from '@stomp/rx-stomp';
import { catchError, take, timeout } from 'rxjs/operators';

export const SERVER_URL_TOKEN = new InjectionToken<string>('SERVER_URL');

@Injectable()
export class ServerConnectionService {

  stomp: RxStomp;

  constructor(@Inject(SERVER_URL_TOKEN) private serverUrl: string) {
    this.stomp = new RxStomp();
  }

  connect(): Observable<any> {
    this.stomp.configure({
      brokerURL: this.serverUrl,
      debug: console.log,
      reconnectDelay: 200
    });

    this.stomp.activate();

    return this.stomp.connected$.pipe(
      take(1),
      timeout(5000),
      catchError(err => {
        this.stomp.deactivate();
        return throwError(err);
      })
    );
  }

}
