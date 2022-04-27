import { Component, OnDestroy } from '@angular/core';
import { filter, Observable, Subject, takeUntil, tap } from 'rxjs';
import { HomeFacade } from '../../state';
import { HomeConnectDialogComponent } from '../home-connect-dialog/home-connect-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  loading$: Observable<boolean>;
  hasServerInfo$: Observable<boolean>;
  private unsubscribe$ = new Subject();

  constructor(
    private homeFacade: HomeFacade,
    private matDialog: MatDialog,
  ) {
    this.loading$ = homeFacade.isLoading();
    this.hasServerInfo$ = homeFacade.hasServerInfo();
  }

  connect(): void {
    this.matDialog.open(HomeConnectDialogComponent).afterClosed().pipe(
      filter(serverInfo => !!serverInfo),
      tap(serverInfo => this.homeFacade.setHomeServer(serverInfo)),
      takeUntil(this.unsubscribe$),
    ).subscribe();
  }

  refresh(): void {
    this.homeFacade.refresh();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

}
