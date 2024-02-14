import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/helper/services/common/utility.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  pageTitle: string;

  constructor(
    private location: Location,
    public utilityService: UtilityService,
    private router: Router) {

    router.events.subscribe((event) => {

      const path = location.path();
      if (path === '/reports/logs/activity') {
        this.pageTitle = 'Activity Log';
      }
      if (path === '/reports/logs/system') {
        this.pageTitle = 'System Log';
      }
    });
  }
  ngOnInit() {
  }

}
