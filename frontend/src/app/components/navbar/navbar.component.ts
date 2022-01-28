import { Component } from '@angular/core';
import { AppFacade } from '../../store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private appFacade: AppFacade) { }

  logout(): void {
    this.appFacade.logout();
  }

}
