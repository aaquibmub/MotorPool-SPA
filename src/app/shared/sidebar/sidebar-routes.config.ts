import { RouteInfo } from './sidebar.metadata';

// Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

  // dashboard
  {
    path: '/dashboard',
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
    path: '/vehicals',
    title: 'Vehicles',
    icon: 'vehicle-icon',
    class: 'sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [

      // vehicals
      {
        path: '/vehicals/pool/all',
        title: 'Vehicles',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/vehicals/vehical/new',
            title: 'Add New Vehicle',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/vehicals/pool/all',
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
        path: '/vehicals/pool/active',
        title: 'Vehicle Status',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/vehicals/pool/active',
            title: 'Active',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/vehicals/pool/inactive',
            title: 'Inactive',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/vehicals/pool/maintenance',
            title: 'Maintainance',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/vehicals/pool/gripped',
            title: 'Gripped',
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
    class: 'sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [

      // trip booking
      {
        path: '/trips/bookings/',
        title: 'Trip Booking',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/trips/booking/new-scheduled',
            title: 'New Scheduled Booking',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/trips/booking/new-start-now',
            title: 'New Trip',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/trips/booking/new-refuelling',
            title: 'New Refuelling',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/trips/bookings/all',
            title: 'All Trip Bookings',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          // {
          //   path: '/trips/bookings/start-now',
          //   title: 'New Trip Bookings',
          //   icon: 'bx bx-right-arrow-alt',
          //   class: '',
          //   badge: '',
          //   badgeClass: '',
          //   isExternalLink: false,
          //   submenu: []
          // },
          // {
          //   path: '/trips/bookings/scheduled',
          //   title: 'Scheduled Trip Bookings',
          //   icon: 'bx bx-right-arrow-alt',
          //   class: '',
          //   badge: '',
          //   badgeClass: '',
          //   isExternalLink: false,
          //   submenu: []
          // },
        ]
      },

      // trips
      {
        path: '/trips/list/',
        title: 'Trips',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/trips/list/today',
            title: 'Today Trips',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/trips/list/on-going',
            title: 'On-going Trips',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // Passengers
      {
        path: '/passengers/list/',
        title: 'Passengers',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/passengers/passenger/new',
            title: 'Add New Passenger',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/passengers/list/all',
            title: 'All Passengers',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // incident
      {
        path: '/incident/list/all',
        title: 'Incident Categories',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/incident/category/new',
            title: 'Add New Category',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/incident/list/all',
            title: 'All Categories',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },

      // Address
      {
        path: '/addresses/list/',
        title: 'Addresses',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/addresses/address/new',
            title: 'Add New Address',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/addresses/list/all',
            title: 'All Addresses',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
        ]
      },


      // Address
      {
        path: '/approvers/list/',
        title: 'Approvers',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/approvers/approver/new',
            title: 'Add New Approver',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/approvers/list/all',
            title: 'All Approvers',
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

  // driver
  {
    path: '/drivers',
    title: 'Drivers',
    icon: 'driver-icon',
    class: 'sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [

      // vehicals
      {
        path: '/drivers/pool/all',
        title: 'Drivers',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            path: '/drivers/driver/new',
            title: 'Add New Driver',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            path: '/drivers/pool/all',
            title: 'All Drivers',
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

  // reports
  {
    path: '/reports',
    title: 'Reports',
    icon: 'reports-icon',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: []
  },

];
