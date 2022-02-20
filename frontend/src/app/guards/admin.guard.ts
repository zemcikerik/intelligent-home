import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppFacade } from '../store';
import { Authority } from '../models';
import { tap } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private appFacade: AppFacade,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.appFacade.hasAuthority(Authority.ADMIN).pipe(
      tap(authorized => !authorized ? this.router.navigateByUrl('/') : void 0),
    );
  }

}
