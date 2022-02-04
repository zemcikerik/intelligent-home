import { Component } from '@angular/core';
import { AppFacade } from '../../store';
import { Authority } from '../../models';
import { Observable } from 'rxjs';

interface NavbarEntry {
  name: string;
  icon: string;
  link: string;
  exact: boolean;
  authority: Authority;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  readonly entries: NavbarEntry[] = [
    { name: 'Home', icon: 'home', link: '/', exact: true, authority: Authority.USER },
    { name: 'Device Management', icon: 'dashboard', link: '/devices', exact: false, authority: Authority.ADMIN },
    { name: 'User Management', icon: 'people', link: '/users', exact: false, authority: Authority.ADMIN },
  ];

  constructor(private appFacade: AppFacade) { }

  hasAuthority(authority: Authority): Observable<boolean> {
    return this.appFacade.hasAuthority(authority);
  }

  logout(): void {
    this.appFacade.logout();
  }

}
