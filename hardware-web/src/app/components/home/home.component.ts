import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeFacade } from '../../state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loading$: Observable<boolean>;

  constructor(private homeFacade: HomeFacade) {
    this.loading$ = homeFacade.isLoading();
  }

  refresh(): void {
    this.homeFacade.refresh();
  }

}
