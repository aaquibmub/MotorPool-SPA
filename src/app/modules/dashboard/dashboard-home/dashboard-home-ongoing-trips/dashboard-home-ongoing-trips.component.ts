import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/helper/services/utilities/dashboard.service';
import { DashboardTripListModel } from './../../../../helper/models/dashboard/dashboard-trip-list-model';

@Component({
  selector: 'app-dashboard-home-ongoing-trips',
  templateUrl: './dashboard-home-ongoing-trips.component.html',
  styleUrls: ['./dashboard-home-ongoing-trips.component.css']
})
export class DashboardHomeOngoingTripsComponent implements OnInit {
  list: DashboardTripListModel[];

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.dashboardService.getOngoingTrips()
      .subscribe(
        (list: DashboardTripListModel[]) => {
          this.list = list;
        }
      );
  }

}
