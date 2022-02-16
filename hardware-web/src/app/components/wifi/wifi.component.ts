import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { WifiFacade } from '../../state';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})
export class WifiComponent {

  connected$: Observable<boolean>;
  loading$: Observable<boolean>;

  constructor(wifiFacade: WifiFacade) {
    this.connected$ = wifiFacade.isConnected();
    this.loading$ = wifiFacade.isLoading();
  }

}
