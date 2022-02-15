import { Component, OnInit } from '@angular/core';
import { WifiService } from "../../services";
import { Observable } from "rxjs";
import { WifiStatus } from "../../models";

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})
export class WifiComponent implements OnInit {

  connectionStatus$!: Observable<WifiStatus>;

  constructor(private readonly wifiService: WifiService) {
  }

  ngOnInit(): void {
    this.connectionStatus$ = this.wifiService.getConnectionStatus();
  }

}
