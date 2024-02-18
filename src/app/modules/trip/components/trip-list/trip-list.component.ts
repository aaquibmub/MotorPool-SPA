import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/helper/services/common/utility.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  pageTitle: string;

  constructor(
    private location: Location,
    private router: Router,
    public utilityService: UtilityService
    ) {
    router.events.subscribe((event) => {
      const path = location.path();
      if (path === '/trips/list/today') {
        this.pageTitle = 'Today Trips';
      }
      if (path === '/trips/list/on-going') {
        this.pageTitle = 'On-going Trips';
      }
    });
  }

  ngOnInit(): void {
  }

}
