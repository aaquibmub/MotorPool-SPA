import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionButton } from './../../../../helper/models/common/grid/action-button';

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
        this.router.navigate(['/trips/booking/new-start-now']);
      },
      icon: '',
      label: 'New Trip'
    },
    {
      handle: () => {
        this.router.navigate(['/trips/booking/new-scheduled']);
      },
      icon: '',
      label: 'Scheduled Trip'
    },
    {
      handle: () => {
        this.router.navigate(['/trips/booking/new-refuelling']);
      },
      icon: '',
      label: 'Refuelling Trip'
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
      if (path === '/trips/bookings/start-now') {
        this.pageTitle = 'New Trips';
      }
      if (path === '/trips/bookings/scheduled') {
        this.pageTitle = 'Scheduled Trips';
      }
      if (path === '/trips/bookings/refuelling') {
        this.pageTitle = 'Refuelling Trips';
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
