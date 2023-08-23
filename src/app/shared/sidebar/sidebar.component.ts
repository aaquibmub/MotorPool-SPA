import { SidebarService } from './../../helper/services/common/sidebar.service';
import { AlertService } from './../../helper/services/common/alert.service';
import { AuthService } from './../../helper/services/auth/auth.service';
import { RouteInfo } from './sidebar.metadata';
import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  animations: [
    trigger('slideInOut', [
      // transition(':enter', [
      //   style({ width: '50%' }),
      //   animate('200ms ease-out', style({ width: '100%' }))
      // ]),
      // transition(':leave', [
      //   animate('200ms ease-in', style({ width: '0%' }))
      // ])
      transition(':enter', [
        style({ left: '80px', transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  public menuItems: RouteInfo[];
  selectedMenu: RouteInfo;
  showSubMenu: boolean;

  constructor(
    public authService: AuthService,
    private alertify: AlertService,
    private router: Router,
    private sidebarservice: SidebarService,
    private location: Location) {

  }

  ngOnInit(): void {

    this.sidebarservice.getSidebarSubMenuState().subscribe(
      (flag) => {
        this.showSubMenu = flag;
      }
    );

    const menuItems: any[] = [];
    ROUTES.forEach(val => {
      menuItems.push(Object.assign({}, val));
    });

    this.menuItems = menuItems;

    const path = this.location.path();
    this.menuItems.forEach(mi => {
      if (path.includes(mi.path)) {
        this.selectedMenu = mi;
        return;
      }
    });

    // this.setSelectedMenu(this.menuItems[0]);
    // ROUTES.forEach(val => menuItems.push(Object.assign({}, val)));
    // const user: User = this.authService.getCurrentUser();
    // const roleBaseMenuItems: RouteInfo[] = [];
    // let rolePaths = [];
    // if (user) {
    //   switch (user.role) {
    //     case UserRole.FinanceMinister: {
    //       rolePaths = GetFinanceMiniterRoleMenu();
    //       break;
    //     }
    //     case UserRole.PiuUser: {
    //       rolePaths = GetPiuUserRoleMenu();
    //       break;
    //     }
    //     case UserRole.SuperAdmin: {
    //       rolePaths = GetSuperAdminRoleMenu().filter(f => f);
    //       break;
    //     }
    //     case UserRole.DepartmentalUser: {
    //       rolePaths = GetDepartmentalUserRoleMenu().filter(f => f);
    //       break;
    //     }
    //   }
    //   rolePaths.forEach(p => {
    //     let mi = menuItems.find(f => f.path === p);
    //     if (mi == null) {
    //       menuItems.forEach((f: any) => {
    //         const mic = f.submenu.find(ff => ff.path.includes(p));
    //         if (mic != null) {
    //           mi = f;
    //           return;
    //         }
    //       });
    //       if (mi != null) {
    //         const list = mi.submenu.filter(f => f);
    //         mi.submenu = [];
    //         rolePaths.forEach(fe => {
    //           const mic = list.find(f => f.path === fe);
    //           if (mic != null) {
    //             mi.submenu.push(mic);
    //           }
    //         });
    //       }
    //     }
    //     if (mi != null) {
    //       const emi = roleBaseMenuItems.find(f => f.title === mi.title);
    //       if (emi == null) {
    //         roleBaseMenuItems.push(mi);
    //       }
    //     }
    //   });
    // } else {
    //   const mi = menuItems.find(f => f.path === '/public-feedback');
    //   roleBaseMenuItems.push(mi);
    // }
    // this.menuItems = roleBaseMenuItems.filter(mi => mi);
    // $.getScript('./assets/js/app-sidebar.js');

  }

  setSelectedMenu(menuItem: RouteInfo): void {
    this.selectedMenu = menuItem;
    if (this.selectedMenu.submenu.length > 0) {
      if (this.selectedMenu.path.startsWith('/shipments')) {
        // this.shipmentService.getShipmentCountModel()
        //   .subscribe(
        //     (model: ShipmentCountModel) => {
        //       this.selectedMenu.submenu.forEach(f => {
        //         const subMenus = f.submenu;
        //         subMenus.forEach(s => {
        //           s.badgeClass = 'menu-badge';
        //           if (s.path.endsWith(ShipmentDeliveryType.Customer.toString() + '/requests')) {
        //             s.badge = model.customerRequests.toString();
        //           }
        //           if (s.path.endsWith(
        //             ShipmentDeliveryType.Customer.toString() + '/orders/due-today')) {
        //             s.badge = model.customerDueToday.toString();
        //           }
        //           if (s.path.endsWith(
        //             ShipmentDeliveryType.Customer.toString() + '/orders/delayed')) {
        //             s.badge = model.customerDelayed.toString();
        //           }
        //           if (s.path.endsWith(ShipmentDeliveryType.Store.toString() + '/requests')) {
        //             s.badge = model.storeRequests.toString();
        //           }
        //           if (s.path.endsWith(
        //             ShipmentDeliveryType.Store.toString() + '/orders/due-today')) {
        //             s.badge = model.storeDueToday.toString();
        //           }
        //           if (s.path.endsWith(
        //             ShipmentDeliveryType.Store.toString() + '/orders/delayed')) {
        //             s.badge = model.storeDelayed.toString();
        //           }
        //         });
        //       });
        //       this.showHideSubMenu(true);
        //     }
        //   );
      } else {

        this.showHideSubMenu(true);
      }
    }
  }

  showHideSubMenu(flag: boolean): void {
    this.sidebarservice.setSidebarSubMenuState(flag);
  }

}
