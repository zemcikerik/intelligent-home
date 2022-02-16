import { Component } from '@angular/core';
import { ConnectedWifiStatus } from "../../models";
import { Observable } from 'rxjs';
import { WifiFacade } from '../../state';

@Component({
  selector: 'app-wifi-info',
  templateUrl: './wifi-info.component.html',
  styleUrls: ['./wifi-info.component.scss']
})
export class WifiInfoComponent {

  status$: Observable<ConnectedWifiStatus>;

  constructor(private wifiFacade: WifiFacade) {
    this.status$ = wifiFacade.getNetworkStatus() as Observable<ConnectedWifiStatus>;
  }

  disconnect(): void {
    this.wifiFacade.disconnect();
  }

}
