import { Routes } from '@angular/router';
import { AuthGuard } from './../../modules/auth/auth.guard';

// Route for content layout with sidebar, navbar and footer.

// tslint:disable-next-line: variable-name
export const Full_ROUTES: Routes = [
  {
    path: 'default',
    loadChildren: () =>
      import('../../modules/user-based-default-route/user-based-default-route.module')
        .then(m => m.UserBasedDefaultRouteModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../modules/home/home.module')
      .then(m => m.HomeModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../modules/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  },
  {
    path: 'trips',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../modules/trip/trip.module')
      .then(m => m.TripModule)
  },
  {
    path: 'drivers',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../modules/driver/driver.module')
      .then(m => m.DriverModule)
  },
  {
    path: 'vehicals',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../modules/vehical/vehical.module')
      .then(m => m.VehicalModule)
  },
  {
    path: 'passengers',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../modules/passenger/passenger.module')
      .then(m => m.PassengerModule)
  },
  {
    path: 'addresses',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../modules/address/address.module')
      .then(m => m.AddressModule)
  },
  {
    path: 'setting',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../modules/setting/setting.module')
      .then(m => m.SettingModule)
  },
  {
    path: 'reports',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../modules/reports/reports.module')
      .then(m => m.ReportsModule)
  },
];
