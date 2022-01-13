import { Component } from '@angular/core';
import { AppFacade } from './store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(appFacade: AppFacade) {
    this.loading$ = appFacade.isAppLoading();
    this.error$ = appFacade.getAppError();
  }

}
