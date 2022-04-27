import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServerInfo } from '../../models';

@Component({
  selector: 'app-home-server-info',
  templateUrl: './home-server-info.component.html',
  styleUrls: ['./home-server-info.component.scss']
})
export class HomeServerInfoComponent {
  @Input() serverInfo?: ServerInfo;
  @Output() disconnect = new EventEmitter();
}
