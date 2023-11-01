
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.css']
})
export class PassengerListComponent implements OnInit {
  pageTitle: string;

  constructor(
    private location: Location,
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
