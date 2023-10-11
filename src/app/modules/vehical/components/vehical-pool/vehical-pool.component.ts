
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionButton } from 'src/app/helper/models/common/grid/action-button';

@Component({
  selector: 'app-vehical-pool',
  templateUrl: './vehical-pool.component.html',
  styleUrls: ['./vehical-pool.component.css']
})
export class VehicalPoolComponent implements OnInit {
  pageTitle: string;

  constructor(
    private location: Location,
    private router: Router) {
    router.events.subscribe((event) => {
      const path = location.path();
      if (path === '/vehicals/pool/all') {
        this.pageTitle = 'All Vehicals';
      }
      if (path === '/vehicals/pool/active') {
        this.pageTitle = 'Active Vehicals';
      }
      if (path === '/vehicals/pool/inactive') {
        this.pageTitle = 'Inactive Vehicals';
      }
    });
  }

  handleCreateNewButtonClick(): void {
    this.router.navigate(['/vehicals/vehical/new']);
  }

  ngOnInit(): void {
  }

}
