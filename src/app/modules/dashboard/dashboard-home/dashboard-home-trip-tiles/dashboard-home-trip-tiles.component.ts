import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TripCountModel } from 'src/app/helper/models/dashboard/trip-count-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { DashboardService } from 'src/app/helper/services/utilities/dashboard.service';

@Component({
  selector: 'app-dashboard-home-trip-tiles',
  templateUrl: './dashboard-home-trip-tiles.component.html',
  styleUrls: ['./dashboard-home-trip-tiles.component.css']
})
export class DashboardHomeTripTilesComponent implements OnInit, OnDestroy {
  countModel: TripCountModel;

  refreshScreenSubscription: Subscription;

  constructor(
    private dashboardService: DashboardService,
    public utilityService: UtilityService,
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

    this.dashboardService.getTripCountModel().subscribe(
      (countModel: TripCountModel) => {
        this.countModel = countModel;
      }
    )
  }

  ngOnDestroy(): void {
    if (this.refreshScreenSubscription) {
      this.refreshScreenSubscription.unsubscribe();
    }
  }

}
