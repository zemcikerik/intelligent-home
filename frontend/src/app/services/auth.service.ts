import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL_TOKEN } from './server-url.token';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    @Inject(SERVER_URL_TOKEN) private serverUrl: string,
  ) { }

  login(username: string, password: string): Observable<string> {
    const body = { username, password };
    return this.httpClient.post(`${this.serverUrl}/login`, body, { observe: 'response' }).pipe(
      map(response => {
        const header = response.headers.get('Authorization');

        if (!header || !header.startsWith('Bearer ')) {
          throw new Error('Valid authorization header not found!');
        }

        return header.substring('Bearer '.length);
      })
    );
  }

}
