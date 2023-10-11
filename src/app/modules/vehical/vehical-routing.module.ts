import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { VehicalComponent } from './vehical.component';
import { VehicalFormsComponent } from './components/vehical-forms/vehical-forms.component';
import { VehicalEditComponent } from './components/vehical-forms/vehical-edit/vehical-edit.component';
import { VehicalPoolComponent } from './components/vehical-pool/vehical-pool.component';
import { VehicalsInactiveComponent } from './components/vehical-pool/vehicals-inactive/vehicals-inactive.component';
import { VehicalsActiveComponent } from './components/vehical-pool/vehicals-active/vehicals-active.component';
import { VehicalsAllComponent } from './components/vehical-pool/vehicals-all/vehicals-all.component';

const routes: Routes = [
  {
    path: '',
    component: VehicalComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: '',
        redirectTo: '/vehicals/pool/all',
        pathMatch: 'full'
      },

      // vehicals
      {
        path: 'vehical',
        component: VehicalFormsComponent,
        children: [
          {
            path: '',
            redirectTo: '/vehicals/pool/all',
            pathMatch: 'full'
          },
          { path: 'new', component: VehicalEditComponent },
          { path: ':id/edit', component: VehicalEditComponent },
        ]
      },
      {
        path: 'pool',
        component: VehicalPoolComponent,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: VehicalsAllComponent },
          { path: 'active', component: VehicalsActiveComponent },
          { path: 'inactive', component: VehicalsInactiveComponent }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicalRoutingModule {
}
