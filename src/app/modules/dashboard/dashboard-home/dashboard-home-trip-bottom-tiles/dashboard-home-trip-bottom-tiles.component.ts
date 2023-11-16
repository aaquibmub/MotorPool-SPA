import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/helper/services/utilities/dashboard.service';
import { TripDetailCountModel } from './../../../../helper/models/dashboard/trip-detail-count-model';

@Component({
  selector: 'app-dashboard-home-trip-bottom-tiles',
  templateUrl: './dashboard-home-trip-bottom-tiles.component.html',
  styleUrls: ['./dashboard-home-trip-bottom-tiles.component.css']
})
export class DashboardHomeTripBottomTilesComponent implements OnInit {
  currentMonth = '';
  countModel: TripDetailCountModel;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    let today = new Date();

    this.currentMonth = today.toLocaleString("default", { month: "long" });

    this.dashboardService.getTripDetailCountModel().subscribe(
      (countModel: TripDetailCountModel) => {
        this.countModel = countModel;
      }
    )
  }

}
