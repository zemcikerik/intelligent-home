import { Component, OnInit } from '@angular/core';
import { WifiService } from "../../services";
import { Observable } from "rxjs";
import { WifiNetwork } from "../../models";

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})
export class WifiComponent implements OnInit {

  wifi$!: Observable<WifiNetwork[]>;

  constructor(private readonly wifiService: WifiService) {
  }

  ngOnInit(): void {
    this.wifi$ = this.wifiService.getAvailableNetworks();
  }

}
