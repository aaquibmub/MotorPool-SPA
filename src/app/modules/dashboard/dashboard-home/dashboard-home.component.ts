import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { DashboardService } from 'src/app/helper/services/utilities/dashboard.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService,
    private utilityService: UtilityService,
  ) { }

  ngOnInit() {

    this.dashboardService.refreshDashboard.subscribe({
      next: (flag: boolean) => {
        if (flag) {
          debugger;
          this.utilityService.redirectToUrl('/dashboard/home');
        }
      },
      error: (err) => console.error(err)
    });
  }

}
