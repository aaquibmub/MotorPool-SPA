
import { Location } from '@angular/common';
import { ActionButton } from 'src/app/helper/models/common/grid/action-button';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-pool',
  templateUrl: './driver-pool.component.html',
  styleUrls: ['./driver-pool.component.css']
})
export class DriverPoolComponent implements OnInit {
  pageTitle: string;

  buttons: ActionButton[] = [
    {
      handle: () => {
        this.router.navigate(['/drivers/driver/new']);
      },
      icon: '',
      label: 'New Driver'
    }
  ];

  constructor(
    private location: Location,
    private router: Router) {
    router.events.subscribe((event) => {
      const path = location.path();
      if (path === '/drivers/pool/all') {
        this.pageTitle = 'All Drivers';
      }
      if (path === '/drivers/pool/active') {
        this.pageTitle = 'Active Drivers';
      }
      if (path === '/drivers/pool/inactive') {
        this.pageTitle = 'Inactive Drivers';
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
