import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WifiNetwork } from "../../models";

@Component({
  selector: 'app-wifi-entry',
  templateUrl: './wifi-entry.component.html',
  styleUrls: ['./wifi-entry.component.scss']
})
export class WifiEntryComponent {
  @Input() wifi?: WifiNetwork;
  @Output() connect = new EventEmitter();
}
