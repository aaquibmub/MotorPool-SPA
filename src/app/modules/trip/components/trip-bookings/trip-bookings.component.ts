import { ActionButton } from './../../../../helper/models/common/grid/action-button';
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

  buttons: ActionButton[] = [
    {
      handle: () => {
        this.router.navigate(['/trips/booking/new-scheduled']);
      },
      icon: '',
      label: 'New Scheduled'
    },
    {
      handle: () => {
        this.router.navigate(['/trips/booking/new-start-now']);
      },
      icon: '',
      label: 'New Start Now'
    }
  ];

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

  handleCreateItemButtonClick(item: ActionButton): void {
    const index = this.buttons.findIndex(f => f === item);
    this.buttons[index].handle();
  }

  ngOnInit(): void {
  }

}
