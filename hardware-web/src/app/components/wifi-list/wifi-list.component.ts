import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { WifiNetwork } from "../../models";
import { WifiFacade } from '../../state';

@Component({
  selector: 'app-wifi-list',
  templateUrl: './wifi-list.component.html',
  styleUrls: ['./wifi-list.component.scss']
})
export class WifiListComponent {

  networks$: Observable<WifiNetwork[]>;

  constructor(wifiFacade: WifiFacade) {
    this.networks$ = wifiFacade.getAvailableNetworks();
  }

}
