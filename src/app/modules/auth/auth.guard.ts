import { AuthService } from './../../helper/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    // private overlayService: OverlayService,
    // private alertify: AlertService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {
    if (this.authService.loggedIn()) {
      const user = this.authService.getCurrentUser();
      if (user != null) {
        if (!user.emailVerified) {
          // this.overlayService.setShowHideVerificationPopup(true);
        }
      }
      return true;
    }

    // this.alertify.alertError.next({
    //   text: 'You must login first to see this'
    // });
    return this.router.navigate(['/auth/sign-in']);
  }
}
