import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { AuthService } from './../../helper/services/auth/auth.service';

@Component({
  selector: 'app-user-based-default-route',
  templateUrl: './user-based-default-route.component.html',
  styleUrls: ['./user-based-default-route.component.css']
})
export class UserBasedDefaultRouteComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.utilityService.redirectToUrl('/auth/login');
      // this.router.navigate([]);
    }
  }

}
