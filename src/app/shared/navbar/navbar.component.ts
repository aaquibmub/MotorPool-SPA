import { NotificationService } from './../../helper/services/common/notification.service';
import { NotificationListModel } from './../../helper/models/common/notifications/notification-list-model';
import { AlertService } from './../../helper/services/common/alert.service';
import { OverlayService } from './../../helper/services/common/overlay.service';
import { SidebarService } from './../../helper/services/common/sidebar.service';
import { AuthService } from './../../helper/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  subTitle: any;
  toggle: boolean;
  showHideExpiryIcon: boolean;
  remainingDays: number;
  toggleTicker: boolean;
  notifications: NotificationListModel[];
  showUserMenu = false;
  showSettingsMenu = false;

  constructor(
    public authService: AuthService,
    public sidebarservice: SidebarService,
    private overlayService: OverlayService,
    // private userService: UserService,
    private notificationService: NotificationService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private alertify: AlertService) {

    router.events.subscribe((event) => {
      // const path = location.path();
      if (event instanceof NavigationEnd) {

        $('.page-wrapper').animate({
          scrollTop: 0
        }, 1000);

      }
    });

  }

  logout(): void {
    this.showHideUserMenu(false);
    localStorage.removeItem('token');
    this.authService.decodedToken = null;
    localStorage.removeItem('user');
    this.authService.currentUser = null;
    // this.alertify.message('logged out');
    this.router.navigate(['/auth/sign-in']);
  }

  showExpiryPopup(): void {
    // this.overlayService.setSubscriptionExpiryPopupModel({
    //   showHide: true,
    //   remainingDays: this.remainingDays
    // });
  }

  ngOnInit(): void {

    this.sidebarservice.getUserMenuState().subscribe(
      (flag) => {
        this.showUserMenu = flag;
      }
    );

    this.sidebarservice.getSettingsMenuState().subscribe(
      (flag) => {
        this.showSettingsMenu = flag;
      }
    );

    this.sidebarservice.getNotificationTickerState().subscribe(
      (flag) => {
        this.toggleTicker = flag;
      }
    );

    this.notificationService.notificationList.subscribe({
      next: (notificationList: NotificationListModel[]) => {
        this.notifications = notificationList;
      },
      error: (err) => console.error(err)
    });

    this.notificationService.setNotificationList();

  }

  toggleNotificationTicker(): void {
    this.sidebarservice.setUserMenuState(false);
    this.sidebarservice.setNotificationTickerState(!this.toggleTicker);
  }

  toggleUserMenu(): void {
    this.sidebarservice.setNotificationTickerState(false);
    this.sidebarservice.setUserMenuState(!this.showUserMenu);
  }

  showHideUserMenu(flag: boolean): void {
    this.sidebarservice.setNotificationTickerState(false);
    this.sidebarservice.setUserMenuState(flag);
  }

  toggleSettingsMenu(): void {
    this.sidebarservice.setNotificationTickerState(false);
    this.sidebarservice.setSettingsMenuState(!this.showSettingsMenu);
  }

  showHideSettingsMenu(flag: boolean): void {
    this.sidebarservice.setNotificationTickerState(false);
    this.sidebarservice.setSettingsMenuState(flag);
  }
}
