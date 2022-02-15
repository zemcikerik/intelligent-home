import { Component, OnInit } from '@angular/core';
import { HomeService } from "../../services";
import { Observable } from "rxjs";
import { HomeStatus } from "../../models";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeStatus$!: Observable<HomeStatus>;

  constructor(private readonly homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeStatus$ = this.homeService.getHomeStatus();
  }

}
