import { AuthGuard } from './../../modules/auth/auth.guard';
import { Routes } from '@angular/router';

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
