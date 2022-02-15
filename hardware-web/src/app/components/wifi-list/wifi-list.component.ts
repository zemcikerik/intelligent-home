import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { WifiNetwork } from "../../models";
import { WifiService } from "../../services";

@Component({
  selector: 'app-wifi-list',
  templateUrl: './wifi-list.component.html',
  styleUrls: ['./wifi-list.component.scss']
})
export class WifiListComponent implements OnInit {

  wifi$!: Observable<WifiNetwork[]>;

  constructor(private readonly wifiService: WifiService) {
  }

  ngOnInit(): void {
    this.wifi$ = this.wifiService.getAvailableNetworks();
  }

}
