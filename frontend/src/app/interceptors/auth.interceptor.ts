import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenStorageService.getToken();

    if (token) {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (token !== null && err.status === 403) {
          this.tokenStorageService.eraseToken();
          // TODO: maybe show global error?
        }
        throw err;
      })
    );
  }

}
