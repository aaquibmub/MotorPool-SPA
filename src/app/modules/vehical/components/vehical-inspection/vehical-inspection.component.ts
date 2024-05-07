import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/helper/services/common/utility.service';

import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vehical-inspection',
  templateUrl: './vehical-inspection.component.html',
  styleUrls: ['./vehical-inspection.component.css']
})
export class VehicalInspectionComponent implements OnInit {
  pageTitle: string;

  constructor(
    public utilityService: UtilityService,
    private location: Location,
    private router: Router) {
    router.events.subscribe((event) => {
      const path = location.path();
      if (path === '/vehicals/inspections/all') {
        this.pageTitle = 'All Inspections';
      }
      if (path === '/vehicals/inspections/due') {
        this.pageTitle = 'Due Inspections';
      }
      if (path === '/vehicals/inspections/failed') {
        this.pageTitle = 'Failed Inspections';
      }
      if (path === '/vehicals/inspections/incomplete') {
        this.pageTitle = 'Incomplete Inspections';
      }
      if (path === '/vehicals/inspections/completed') {
        this.pageTitle = 'Completed Inspections';
      }
    });
  }

  handleCreateNewButtonClick(): void {
    // this.router.navigate(['/vehicals/inspections/new']);
  }

  ngOnInit(): void {
  }

}
