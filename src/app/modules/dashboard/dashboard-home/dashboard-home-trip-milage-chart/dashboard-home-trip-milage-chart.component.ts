import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { DashboardService } from 'src/app/helper/services/utilities/dashboard.service';
import { TripTypeMilageChartModel } from './../../../../helper/models/dashboard/trip-type-milage-chart-model';

@Component({
  selector: 'app-dashboard-home-trip-milage-chart',
  templateUrl: './dashboard-home-trip-milage-chart.component.html',
  styleUrls: ['./dashboard-home-trip-milage-chart.component.css']
})
export class DashboardHomeTripMilageChartComponent implements OnInit {
  public data: TripTypeMilageChartModel[] = [];
  totalMilage: number = 0;
  colors = [
    '#55D8FE',
    '#FA8373',
    '#FDDA83',
    '#A3A0FB'
  ];
  icons = [
    'blue',
    'red',
    'yellow',
    'purple'
  ]
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

    this.dashboardService.getTripTypeMilageChartListModel()
      .subscribe(
        (list: TripTypeMilageChartModel[]) => {
          let i = 0;
          list.forEach(f => {
            this.totalMilage += f.milage;
            f.color = i < this.colors.length ? this.colors[i] : undefined;
            f.iconClass = i < this.icons.length ? this.icons[i] : undefined;
            i++;
          });

          this.data = list;

        }
      );

  }

  ngOnDestroy(): void {
    if (this.refreshScreenSubscription) {
      this.refreshScreenSubscription.unsubscribe();
    }
  }


  public labelContent(e: any): string {
    return e.category;
  }

}
