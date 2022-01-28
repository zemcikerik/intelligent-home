import { Component } from '@angular/core';
import { AppFacade } from './store';
import { Observable } from 'rxjs';
import { AppPhase } from './app-phase.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  phase$: Observable<AppPhase>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(appFacade: AppFacade) {
    this.phase$ = appFacade.getAppPhase();
    this.loading$ = appFacade.isAppLoading();
    this.error$ = appFacade.getAppError();
  }

}
