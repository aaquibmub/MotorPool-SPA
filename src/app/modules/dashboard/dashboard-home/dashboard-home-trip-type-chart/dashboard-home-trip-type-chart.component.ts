import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { TripTypeChartModel } from './../../../../helper/models/dashboard/trip-type-chart-model';
import { DashboardService } from './../../../../helper/services/utilities/dashboard.service';

@Component({
  selector: 'app-dashboard-home-trip-type-chart',
  templateUrl: './dashboard-home-trip-type-chart.component.html',
  styleUrls: ['./dashboard-home-trip-type-chart.component.css']
})
export class DashboardHomeTripTypeChartComponent implements OnInit {
  public data: TripTypeChartModel[] = [];
  totalTrips: number = 0;
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
    this.dashboardService.getTripTypeChartListModel()
      .subscribe(
        (list: TripTypeChartModel[]) => {
          let i = 0;
          this.totalTrips = 0;
          list.forEach(f => {
            this.totalTrips += f.count;
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
