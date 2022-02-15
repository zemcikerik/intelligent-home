import { Component, Input, OnInit } from '@angular/core';
import { WifiNetwork } from "../../models";

@Component({
  selector: 'app-wifi-entry',
  templateUrl: './wifi-entry.component.html',
  styleUrls: ['./wifi-entry.component.scss']
})
export class WifiEntryComponent implements OnInit {

  @Input() wifi?: WifiNetwork;

  constructor() { }

  ngOnInit(): void {
  }

}
