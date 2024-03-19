import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { DashboardService } from 'src/app/helper/services/utilities/dashboard.service';
import { TripDetailCountModel } from './../../../../helper/models/dashboard/trip-detail-count-model';

@Component({
  selector: 'app-dashboard-home-trip-bottom-tiles',
  templateUrl: './dashboard-home-trip-bottom-tiles.component.html',
  styleUrls: ['./dashboard-home-trip-bottom-tiles.component.css']
})
export class DashboardHomeTripBottomTilesComponent implements OnInit, OnDestroy {
  currentMonth = '';
  countModel: TripDetailCountModel;
  refreshScreenSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    let today = new Date();

    this.currentMonth = today.toLocaleString("default", { month: "long" });

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

    this.dashboardService.getTripDetailCountModel().subscribe(
      (countModel: TripDetailCountModel) => {
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
