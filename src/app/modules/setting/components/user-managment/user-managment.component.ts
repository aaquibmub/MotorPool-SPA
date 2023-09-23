import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {

  pageTitle: string;

  constructor(
    private location: Location,
    private router: Router) {

    router.events.subscribe((event) => {

      const path = location.path();
      if (path === '/setting/user-management/users') {
        this.pageTitle = 'Users';
      }
      if (path === '/settings/user-management/roles') {
        this.pageTitle = 'Roles';
      }

    });
  }
  ngOnInit() {
  }

}
