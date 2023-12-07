import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DriverComponent } from './driver.component';
import { DriverFormsComponent } from './components/driver-forms/driver-forms.component';
import { DriverEditComponent } from './components/driver-forms/driver-edit/driver-edit.component';
import { DriverPoolComponent } from './components/driver-pool/driver-pool.component';
import { DriversAllComponent } from './components/driver-pool/drivers-all/drivers-all.component';
import { DriversActiveComponent } from './components/driver-pool/drivers-active/drivers-active.component';
import { DriversInactiveComponent } from './components/driver-pool/drivers-inactive/drivers-inactive.component';
import { DriverViewComponent } from './components/driver-view/driver-view.component';
import { DriverViewDetailComponent } from './components/driver-view/driver-view-detail/driver-view-detail.component';
import { DriverViewTripsComponent } from './components/driver-view/driver-view-trips/driver-view-trips.component';
import { DriverViewInspectionComponent } from './components/driver-view/driver-view-inspection/driver-view-inspection.component';
import { DriverViewVehicleComponent } from './components/driver-view/driver-view-vehicle/driver-view-vehicle.component';

const routes: Routes = [
  {
    path: '',
    component: DriverComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: '',
        redirectTo: '/drivers/pool/all',
        pathMatch: 'full'
      },

      // drivers
      {
        path: 'driver',
        component: DriverFormsComponent,
        children: [
          {
            path: '',
            redirectTo: '/drivers/pool/all',
            pathMatch: 'full'
          },
          { path: 'new', component: DriverEditComponent },
        ]
      },
      {
        path: 'view/:id',
        component: DriverViewComponent,
        children: [
          {
            path: '',
            redirectTo: '/drivers/view/:id/detail',
            pathMatch: 'full'
          },
          { path: 'detail', component: DriverViewDetailComponent },
          { path: 'trips', component: DriverViewTripsComponent },
          { path: 'inspection', component: DriverViewInspectionComponent },
          { path: 'vehicle', component: DriverViewVehicleComponent },
        ]
      },
      {
        path: 'pool',
        component: DriverPoolComponent,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: DriversAllComponent },
          { path: 'active', component: DriversActiveComponent },
          { path: 'inactive', component: DriversInactiveComponent }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule {
}
