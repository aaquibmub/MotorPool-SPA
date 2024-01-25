
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/helper/services/common/utility.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
  pageTitle: string;

  constructor(
    private location: Location,
    public utilityService: UtilityService,
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
