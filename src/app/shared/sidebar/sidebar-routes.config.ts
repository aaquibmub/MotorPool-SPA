import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { RouteInfo } from './sidebar.metadata';

// Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

  // dashboard
  {
    operation: UtilityRix.operations.opDashboard,
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
    operation: UtilityRix.operations.opVehicals,
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
        operation: UtilityRix.operations.opVehicals,
        path: '/vehicals/pool/all',
        title: 'Vehicles',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            operation: UtilityRix.operations.opVehicals,
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
            operation: UtilityRix.operations.opVehicals,
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
        operation: UtilityRix.operations.opVehicals,
        path: '/vehicals/pool/active',
        title: 'Vehicle Status',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            operation: UtilityRix.operations.opVehicals,
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
            operation: UtilityRix.operations.opVehicals,
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
            operation: UtilityRix.operations.opVehicals,
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
            operation: UtilityRix.operations.opVehicals,
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
        operation: UtilityRix.operations.opVehicalInspections,
        path: '/vehicals/inspections',
        title: 'Inspections',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            operation: UtilityRix.operations.opVehicalInspections,
            path: '/vehicals/inspections/all',
            title: 'All Inspections',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            operation: UtilityRix.operations.opVehicalInspections,
            path: '/vehicals/inspections/due',
            title: 'Due Inspections',
            icon: 'bx bx-right-arrow-alt',
            class: '',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            submenu: []
          },
          {
            operation: UtilityRix.operations.opVehicalInspections,
            path: '/vehicals/inspections/completed',
            title: 'Completed Inspections',
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
    operation: UtilityRix.operations.opTripBookings,
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
        operation: UtilityRix.operations.opTripBookings,
        path: '/trips/bookings/',
        title: 'Trip Booking',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            operation: UtilityRix.operations.opTripBookings,
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
            operation: UtilityRix.operations.opTripBookings,
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
            operation: UtilityRix.operations.opTripBookings,
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
            operation: UtilityRix.operations.opTripBookings,
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
        operation: UtilityRix.operations.opTripBookings,
        path: '/trips/list/',
        title: 'Trips',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            operation: UtilityRix.operations.opTripBookings,
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
            operation: UtilityRix.operations.opTripBookings,
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
        operation: UtilityRix.operations.opPassenger,
        path: '/passengers/list/',
        title: 'Passengers',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            operation: UtilityRix.operations.opPassenger,
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
            operation: UtilityRix.operations.opPassenger,
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
        operation: UtilityRix.operations.opIncidents,
        path: '/incident/list/all',
        title: 'Incident Categories',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            operation: UtilityRix.operations.opIncidents,
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
            operation: UtilityRix.operations.opIncidents,
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
        operation: UtilityRix.operations.opAddresss,
        path: '/addresses/list/',
        title: 'Addresses',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            operation: UtilityRix.operations.opAddresss,
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
            operation: UtilityRix.operations.opAddresss,
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


      // Approvers
      {
        operation: UtilityRix.operations.opApprovers,
        path: '/approvers/list/',
        title: 'Approvers',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            operation: UtilityRix.operations.opApprovers,
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
            operation: UtilityRix.operations.opApprovers,
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
    operation: UtilityRix.operations.opDrivers,
    path: '/drivers',
    title: 'Drivers',
    icon: 'driver-icon',
    class: 'sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [

      // drivers
      {
        operation: UtilityRix.operations.opDrivers,
        path: '/drivers/pool/all',
        title: 'Drivers',
        icon: 'bx bx-right-arrow-alt',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
          {
            operation: UtilityRix.operations.opDrivers,
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
            operation: UtilityRix.operations.opDrivers,
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
    operation: null,
    title: 'Reports',
    icon: 'reports-icon',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: []
  },

];
