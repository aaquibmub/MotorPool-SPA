import { SidebarService } from './../../helper/services/common/sidebar.service';
import { AuthService } from './../../helper/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})

export class FullLayoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public sidebarservice: SidebarService,
    private router: Router
  ) { }

  hideSidebarSubMenu(): void {
    this.sidebarservice.setSidebarSubMenuState(false);
  }

  hideTopBarMenus(): void {
    this.sidebarservice.setSettingsMenuState(false);
    this.sidebarservice.setUserMenuState(false);
    this.sidebarservice.setNotificationTickerState(false);
  }

  ngOnInit(): void {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

}
