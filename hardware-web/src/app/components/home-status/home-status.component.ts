import { Component } from '@angular/core';
import { HomeFacade } from '../../state';
import { filter, Observable, Subject, takeUntil, tap } from 'rxjs';
import { HomeStatus } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { HomeConnectDialogComponent } from '../home-connect-dialog/home-connect-dialog.component';

@Component({
  selector: 'app-home-status',
  templateUrl: './home-status.component.html',
  styleUrls: ['./home-status.component.scss']
})
export class HomeStatusComponent {

  status$: Observable<HomeStatus>;
  private unsubscribe$ = new Subject();

  constructor(
    private homeFacade: HomeFacade,
    private matDialog: MatDialog,
  ) {
    this.status$ = homeFacade.getStatus();
  }

  connect(): void {
    this.matDialog.open(HomeConnectDialogComponent).afterClosed().pipe(
      filter(serverInfo => !!serverInfo),
      tap(serverInfo => this.homeFacade.setHomeServer(serverInfo)),
      takeUntil(this.unsubscribe$),
    ).subscribe();
  }

  disconnect(): void {
    this.homeFacade.disconnect();
  }

}
