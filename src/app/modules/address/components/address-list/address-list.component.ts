
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
  pageTitle: string;

  constructor(
    private location: Location,
    private router: Router) {
    router.events.subscribe((event) => {
      const path = location.path();
      if (path === '/addresses/list/all') {
        this.pageTitle = 'Addresses';
      }
    });
  }

  handleCreateNewButtonClick(): void {
    this.router.navigate(['/addresses/address/new']);
  }

  ngOnInit(): void {
  }

}
