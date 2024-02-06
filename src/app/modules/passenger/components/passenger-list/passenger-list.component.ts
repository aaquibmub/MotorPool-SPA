
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/helper/services/common/utility.service';

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.css']
})
export class PassengerListComponent implements OnInit {
  pageTitle: string;

  constructor(
    public utilityService: UtilityService,
    private location: Location,
    public utilityService: UtilityService,
    private router: Router) {
    router.events.subscribe((event) => {
      const path = location.path();
      if (path === '/passengers/list/all') {
        this.pageTitle = 'Passengers';
      }
    });
  }

  handleCreateNewButtonClick(): void {
    this.router.navigate(['/passengers/passenger/new']);
  }

  ngOnInit(): void {
  }

}
