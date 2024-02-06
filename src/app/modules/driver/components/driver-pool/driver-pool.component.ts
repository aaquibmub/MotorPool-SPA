
import { Location } from '@angular/common';
import { ActionButton } from 'src/app/helper/models/common/grid/action-button';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/helper/services/common/utility.service';

@Component({
  selector: 'app-driver-pool',
  templateUrl: './driver-pool.component.html',
  styleUrls: ['./driver-pool.component.css']
})
export class DriverPoolComponent implements OnInit {
  pageTitle: string;

  constructor(
    public utilityService: UtilityService,
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

  handleCreateNewButtonClick(): void {
    this.router.navigate(['/drivers/driver/new']);
  }

  ngOnInit(): void {
  }

}
