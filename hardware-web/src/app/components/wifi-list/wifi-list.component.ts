import { Component, OnDestroy } from '@angular/core';
import { filter, Observable, Subject, takeUntil, tap } from 'rxjs';
import { WifiEncryptionType, WifiNetwork } from '../../models';
import { WifiFacade } from '../../state';
import { MatDialog } from '@angular/material/dialog';
import { WifiConnectDialogComponent } from '../wifi-connect-dialog/wifi-connect-dialog.component';

@Component({
  selector: 'app-wifi-list',
  templateUrl: './wifi-list.component.html',
  styleUrls: ['./wifi-list.component.scss']
})
export class WifiListComponent implements OnDestroy {

  networks$: Observable<WifiNetwork[]>;
  private unsubscribe$ = new Subject();

  displayedColumns = ['ssid', 'rssi', 'channel', 'type', 'connect'];

  constructor(
    private wifiFacade: WifiFacade,
    private matDialog: MatDialog,
  ) {
    this.networks$ = wifiFacade.getAvailableNetworks();
  }

  connect(network: WifiNetwork | null): void {
    if (network && network.type === WifiEncryptionType.OPEN) {
      this.wifiFacade.connect({ ssid: network.ssid, pswd: null });
      return;
    }

    this.matDialog.open(WifiConnectDialogComponent, { data: network }).afterClosed().pipe(
      filter(connectInfo => !!connectInfo),
      tap(connectInfo => this.wifiFacade.connect(connectInfo)),
      takeUntil(this.unsubscribe$),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

}
