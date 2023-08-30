import { RouteInfo } from './sidebar.metadata';

// Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

  // home
  {
    path: '/home',
    title: 'Home',
    icon: 'home-icon',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: []
  },

  // vehical
  {
    path: '/vehicles',
    title: 'Vehicles',
    icon: 'vehicle-icon',
    class: 'sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [

      // sale order
      {
        path: '/vehicles/all-vehicles',
        title: 'Vehicles',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/vehicles/new',
            title: 'Add New Vehicle',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/vehicles/all-vehicles',
            title: 'All Vehicles',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // Vehicle Status
      {
        path: '/vehicles/status',
        title: 'Vehicle Status',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/vehicles/status/active',
            title: 'Active',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/vehicles/status/idle',
            title: 'All Invoices',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/vehicles/status/maintainance',
            title: 'Maintainance',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // Vehicle Inspection
      {
        path: '/vehicles/inspection',
        title: 'Inspections',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/vehicla/inspection/all',
            title: 'All Inspections',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/vehicle/inspection/due',
            title: 'Due Inspections',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/vehicle/inspection/failed',
            title: 'Failed Inspections',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/vehicle/inspection/incomplete',
            title: 'Incomplete Inspections',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },
    ]
  },

  // trip
  {
    path: '/trips',
    title: 'Trips',
    icon: 'trip-icon',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: []
  },

  // driver
  {
    path: '/drivers',
    title: 'Drivers',
    icon: 'driver-icon',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: []
  },

];
