import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardTripListModel } from 'src/app/helper/models/dashboard/dashboard-trip-list-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { DashboardService } from 'src/app/helper/services/utilities/dashboard.service';

@Component({
  selector: 'app-dashboard-home-pending-trips',
  templateUrl: './dashboard-home-pending-trips.component.html',
  styleUrls: ['./dashboard-home-pending-trips.component.css']
})
export class DashboardHomePendingTripsComponent implements OnInit {
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

    this.dashboardService.getPendingTrips()
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
