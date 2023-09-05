import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-trip-bookings',
  templateUrl: './trip-bookings.component.html',
  styleUrls: ['./trip-bookings.component.css']
})
export class TripBookingsComponent implements OnInit {
  pageTitle: string;

  constructor(
    private location: Location,
    private router: Router) {
    router.events.subscribe((event) => {
      const path = location.path();
      if (path === '/trips/bookings/all') {
        this.pageTitle = 'All Trip Bookings';
      }
      if (path === '/trips/bookings/scheduled') {
        this.pageTitle = 'Scheduled Booking';
      }
      if (path === '/trips/bookings/start-now') {
        this.pageTitle = 'Start Now Bookings';
      }
    });
  }

  ngOnInit(): void {
  }

}
