import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthService {

  login(username: string, password: string): Observable<any> {
    return of();
  }

}
