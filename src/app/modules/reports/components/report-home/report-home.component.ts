import { Component, OnInit } from '@angular/core';
import { RouteInfo } from './../../../../shared/sidebar/sidebar.metadata';

@Component({
  selector: 'app-report-home',
  templateUrl: './report-home.component.html',
  styleUrls: ['./report-home.component.css']
})
export class ReportHomeComponent implements OnInit {
  menuItems: RouteInfo[] = [];

  constructor() { }

  ngOnInit() {
    this.menuItems = [
      // trips
      {
        path: '/reports/trips/all',
        title: 'Trips',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/reports/trips/all',
            title: 'All Trips',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/trips/today',
            title: 'Today Trips',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/trips/ongoing',
            title: 'Ongoing Trips',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/trips/upcoming',
            title: 'Upcoming Trips',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/trips/opm-today',
            title: 'OPM Trips - Today',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/trips/opm-current-month',
            title: 'OPM Trips - Current Month',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/trips/saudi-today',
            title: 'Saudi Trips - Today',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/trips/saudi-current-month',
            title: 'Saudi Trips - Current Month',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/trips/milage',
            title: 'Trips Milage',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '',
            title: '',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/trips/opm-milage-today',
            title: 'OPM Milage - Today',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/trips/opm-milage-current-month',
            title: 'OPM Milage - Current Month',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/trips/saudi-milage-today',
            title: 'Saudi Milage - Today',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/trips/saudi-milage-current-month',
            title: 'Saudi Milage - Current Month',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/trips/driver-sheet',
            title: 'Driver Sheet',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/trips/passenger-sheet',
            title: 'Passenger Sheet',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/trips/vehicle-sheet',
            title: 'Vehicle Sheet',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/trips/trip-sheet',
            title: 'Trip Sheet',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // vehicles
      {
        path: '/reports/vehicles/all',
        title: 'Vehicles',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/reports/vehicles/all',
            title: 'All Vehicles',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/vehicles/due-oil-change',
            title: 'Vehicles Due Oil Change',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/vehicles/all-general-inspection',
            title: 'All General Inspections',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/vehicles/milage',
            title: 'Vehicle Milage',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/vehicles/body-inspection',
            title: 'Vehicle Body Inspections',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // drivers
      {
        path: '/reports/drivers/all',
        title: 'Drivers',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/reports/drivers/all',
            title: 'All Drivers',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/drivers/trips',
            title: 'Driver vs Trips',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/drivers/milage',
            title: 'Driver`s Daily Milage',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // passengers
      {
        path: '/reports/passengers/all',
        title: 'Passengers',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/reports/passengers/all',
            title: 'All Passengers',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/reports/passengers/trips',
            title: 'Passenger vs Trips',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },
    ];
  }

}
