import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { RouteInfo } from '../sidebar/sidebar.metadata';
import { NotificationListModel } from './../../helper/models/common/notifications/notification-list-model';
import { AuthService } from './../../helper/services/auth/auth.service';
import { AlertService } from './../../helper/services/common/alert.service';
import { NotificationTickerService } from './../../helper/services/common/notification.service';
import { SidebarService } from './../../helper/services/common/sidebar.service';

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
  settingMenuItems: RouteInfo[] = UtilityRix.settingMenuItems;

  constructor(
    public authService: AuthService,
    private translate: TranslateService,
    public sidebarservice: SidebarService,
    private utilityService: UtilityService,
    // private userService: UserService,
    private notificationService: NotificationTickerService,
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

  handleLanguageValueChange(value: boolean): void {
    if (value) {
      this.translate.setDefaultLang('ar');
      this.translate.use('ar');
    } else {

      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }
  }

  showExpiryPopup(): void {
    // this.overlayService.setSubscriptionExpiryPopupModel({
    //   showHide: true,
    //   remainingDays: this.remainingDays
    // });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();

    const roleBasedMenuItems = this.utilityService.getRoleBasedMenuItems(user, true);

    const settingMenuItems = this.settingMenuItems;
    settingMenuItems.forEach(f => {
      const index = roleBasedMenuItems.findIndex(fi => fi.path === f.path);
      const found = index !== -1;
      if (!found) {
        this.settingMenuItems = this.settingMenuItems.filter(fff => fff.path !== f.path);
      }
    });

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
