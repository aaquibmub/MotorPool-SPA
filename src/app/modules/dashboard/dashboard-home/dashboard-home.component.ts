import { Component, OnInit } from '@angular/core';
import { UserRoleType } from 'src/app/helper/common/shared-types';
import { CurrentUserModel } from 'src/app/helper/models/auth/current-user-model';
import { AuthService } from 'src/app/helper/services/auth/auth.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  user: CurrentUserModel;
  roleType = UserRoleType;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

}
