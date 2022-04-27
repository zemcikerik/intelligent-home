import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppFacade } from './state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  error$: Observable<string | null>;

  constructor(appFacade: AppFacade) {
    this.error$ = appFacade.getError();
  }

}
