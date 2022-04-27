import { Component } from '@angular/core';
import { HomeFacade } from '../../state';
import { Observable } from 'rxjs';
import { HomeStatus } from '../../models';

@Component({
  selector: 'app-home-status',
  templateUrl: './home-status.component.html',
  styleUrls: ['./home-status.component.scss']
})
export class HomeStatusComponent {

  status$: Observable<HomeStatus>;

  constructor(private homeFacade: HomeFacade,) {
    this.status$ = homeFacade.getStatus();
  }

  disconnect(): void {
    this.homeFacade.disconnect();
  }

}
