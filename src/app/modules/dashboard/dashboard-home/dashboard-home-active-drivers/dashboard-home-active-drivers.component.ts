import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardDriverListModel } from 'src/app/helper/models/dashboard/dashboard-driver-list-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { DashboardService } from 'src/app/helper/services/utilities/dashboard.service';

@Component({
  selector: 'app-dashboard-home-active-drivers',
  templateUrl: './dashboard-home-active-drivers.component.html',
  styleUrls: ['./dashboard-home-active-drivers.component.css']
})
export class DashboardHomeActiveDriversComponent implements OnInit, OnDestroy {
  list: DashboardDriverListModel[];

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
    this.dashboardService.getActiveDrivers()
      .subscribe(
        (list: DashboardDriverListModel[]) => {
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
