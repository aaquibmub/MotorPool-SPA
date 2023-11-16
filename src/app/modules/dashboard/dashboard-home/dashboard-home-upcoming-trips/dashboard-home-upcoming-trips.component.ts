import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/helper/services/utilities/dashboard.service';
import { DashboardTripListModel } from './../../../../helper/models/dashboard/dashboard-trip-list-model';

@Component({
  selector: 'app-dashboard-home-upcoming-trips',
  templateUrl: './dashboard-home-upcoming-trips.component.html',
  styleUrls: ['./dashboard-home-upcoming-trips.component.css']
})
export class DashboardHomeUpcomingTripsComponent implements OnInit {
  list: DashboardTripListModel[];

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.dashboardService.getUpcomingTrips()
      .subscribe(
        (list: DashboardTripListModel[]) => {
          this.list = list;
        }
      );
  }

}
