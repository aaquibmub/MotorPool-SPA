import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { DashboardService } from 'src/app/helper/services/utilities/dashboard.service';
import { DashboardTripListModel } from './../../../../helper/models/dashboard/dashboard-trip-list-model';

@Component({
  selector: 'app-dashboard-home-ongoing-trips',
  templateUrl: './dashboard-home-ongoing-trips.component.html',
  styleUrls: ['./dashboard-home-ongoing-trips.component.css']
})
export class DashboardHomeOngoingTripsComponent implements OnInit, OnDestroy {
  list: DashboardTripListModel[];

  refreshScreenSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {

    this.refreshScreenSubscription = this.utilityService.refreshData.subscribe({
      next: (flag: boolean) => {
        if (flag) {
          this.loadData();
        }
      },
      error: (err) => console.error(err)
    });

    this.loadData();
  }

  loadData(): void {
    this.dashboardService.getOngoingTrips()
      .subscribe(
        (list: DashboardTripListModel[]) => {
          this.list = list;
        }
      );

  }

  ngOnDestroy(): void {
    if (this.refreshScreenSubscription) {
      this.refreshScreenSubscription.unsubscribe();
    }
  }

}
