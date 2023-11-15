import { Component, OnInit } from '@angular/core';
import { TripCountModel } from 'src/app/helper/models/dashboard/trip-count-model';
import { DashboardService } from 'src/app/helper/services/utilities/dashboard.service';

@Component({
  selector: 'app-dashboard-home-trip-tiles',
  templateUrl: './dashboard-home-trip-tiles.component.html',
  styleUrls: ['./dashboard-home-trip-tiles.component.css']
})
export class DashboardHomeTripTilesComponent implements OnInit {
  countModel: TripCountModel;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.dashboardService.getTripCountModel().subscribe(
      (countModel: TripCountModel) => {
        this.countModel = countModel;
      }
    )
  }

}
