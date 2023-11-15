import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../helper/services/auth/auth.service';

@Component({
  selector: 'app-user-based-default-route',
  templateUrl: './user-based-default-route.component.html',
  styleUrls: ['./user-based-default-route.component.css']
})
export class UserBasedDefaultRouteComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

}
