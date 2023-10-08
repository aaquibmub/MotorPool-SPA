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
