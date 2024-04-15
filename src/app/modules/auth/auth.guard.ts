import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { RouteInfo } from 'src/app/shared/sidebar/sidebar.metadata';
import { AuthService } from './../../helper/services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private utilityService: UtilityService,
    // private alertify: AlertService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {
    const path = route.url[0]?.path;
    if (this.authService.loggedIn()) {
      let roleBasedMenuItems: RouteInfo[] = [];
      const user = this.authService.getCurrentUser();
      if (user != null) {
        roleBasedMenuItems = this.utilityService.getRoleBasedMenuItems(user, true);
      }
      const abc = roleBasedMenuItems.find(f => f.path.includes(path));
      if (abc || path == undefined) {
        return true;
      }
      return this.router.navigate(['/default']);
    }

    // this.alertify.alertError.next({
    //   text: 'You must login first to see this'
    // });
    return this.router.navigate(['/auth/login']);
  }
}
