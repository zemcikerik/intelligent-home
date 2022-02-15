import { Component, Input, OnInit } from '@angular/core';
import { ConnectedWifiStatus } from "../../models";

@Component({
  selector: 'app-wifi-info',
  templateUrl: './wifi-info.component.html',
  styleUrls: ['./wifi-info.component.scss']
})
export class WifiInfoComponent implements OnInit {

  @Input() wifiStatus?: ConnectedWifiStatus;

  constructor() { }

  ngOnInit(): void {
  }

}
