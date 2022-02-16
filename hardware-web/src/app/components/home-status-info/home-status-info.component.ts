import { Component, Input, OnInit } from '@angular/core';
import { HomeStatus, ServerInfo } from '../../models';

@Component({
  selector: 'app-home-status-info',
  templateUrl: './home-status-info.component.html',
  styleUrls: ['./home-status-info.component.scss']
})
export class HomeStatusInfoComponent implements OnInit {
  @Input() homeStatus?: HomeStatus;
  serverInfo?: ServerInfo;

  constructor() { }

  ngOnInit(): void {
    if (this.homeStatus?.hasServerInfo) {
      this.serverInfo = this.homeStatus.serverInfo;
    }
  }

}
