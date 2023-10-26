import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  pageTitle: string;

  constructor(
    private location: Location,
    private router: Router) {
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
