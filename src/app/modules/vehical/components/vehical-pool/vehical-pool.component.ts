
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/helper/services/common/utility.service';

@Component({
  selector: 'app-vehical-pool',
  templateUrl: './vehical-pool.component.html',
  styleUrls: ['./vehical-pool.component.css']
})
export class VehicalPoolComponent implements OnInit {
  pageTitle: string;

  constructor(
    public utilityService: UtilityService,
    private location: Location,
    private router: Router) {
    router.events.subscribe((event) => {
      const path = location.path();
      if (path === '/vehicals/pool/all') {
        this.pageTitle = 'All Vehicles';
      }
      if (path === '/vehicals/pool/active') {
        this.pageTitle = 'Active Vehicles';
      }
      if (path === '/vehicals/pool/inactive') {
        this.pageTitle = 'Inactive Vehicles';
      }
      if (path === '/vehicals/pool/maintenance') {
        this.pageTitle = 'Under Maintenance';
      }
      if (path === '/vehicals/pool/gripped') {
        this.pageTitle = 'Gripped Vehicles';
      }
    });
  }

  handleCreateNewButtonClick(): void {
    this.router.navigate(['/vehicals/vehical/new']);
  }

  ngOnInit(): void {
  }

}
