import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { VehicalEditComponent } from './components/vehical-forms/vehical-edit/vehical-edit.component';
import { VehicalFormsComponent } from './components/vehical-forms/vehical-forms.component';
import { VehicalInspectionAllComponent } from './components/vehical-inspection/vehical-inspection-all/vehical-inspection-all.component';
import { VehicalInspectionCompletedComponent } from './components/vehical-inspection/vehical-inspection-completed/vehical-inspection-completed.component';
import { VehicalInspectionDueComponent } from './components/vehical-inspection/vehical-inspection-due/vehical-inspection-due.component';
import { VehicalInspectionIncompleteComponent } from './components/vehical-inspection/vehical-inspection-incomplete/vehical-inspection-incomplete.component';
import { VehicalInspectionComponent } from './components/vehical-inspection/vehical-inspection.component';
import { VehicalPoolComponent } from './components/vehical-pool/vehical-pool.component';
import { VehicalsActiveComponent } from './components/vehical-pool/vehicals-active/vehicals-active.component';
import { VehicalsAllComponent } from './components/vehical-pool/vehicals-all/vehicals-all.component';
import { VehicalsGrippedComponent } from './components/vehical-pool/vehicals-gripped/vehicals-gripped.component';
import { VehicalsInactiveComponent } from './components/vehical-pool/vehicals-inactive/vehicals-inactive.component';
import { VehicalsMaintenanceComponent } from './components/vehical-pool/vehicals-maintenance/vehicals-maintenance.component';
import { VehicalViewDetailComponent } from './components/vehical-view/vehical-view-detail/vehical-view-detail.component';
import { VehicalViewDriversComponent } from './components/vehical-view/vehical-view-drivers/vehical-view-drivers.component';
import { VehicalViewInspectionsComponent } from './components/vehical-view/vehical-view-inspections/vehical-view-inspections.component';
import { VehicalViewTripsComponent } from './components/vehical-view/vehical-view-trips/vehical-view-trips.component';
import { VehicalViewComponent } from './components/vehical-view/vehical-view.component';
import { VehicalComponent } from './vehical.component';

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
        path: 'view/:id',
        component: VehicalViewComponent,
        children: [
          {
            path: '',
            redirectTo: '/vehicals/view/:id/detail',
            pathMatch: 'full'
          },
          { path: 'detail', component: VehicalViewDetailComponent },
          { path: 'trips', component: VehicalViewTripsComponent },
          { path: 'inspection', component: VehicalViewInspectionsComponent },
          { path: 'driver', component: VehicalViewDriversComponent },
        ]
      },
      {
        path: 'pool',
        component: VehicalPoolComponent,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: VehicalsAllComponent },
          { path: 'active', component: VehicalsActiveComponent },
          { path: 'inactive', component: VehicalsInactiveComponent },
          { path: 'maintenance', component: VehicalsMaintenanceComponent },
          { path: 'gripped', component: VehicalsGrippedComponent }
        ]
      },
      {
        path: 'inspections',
        component: VehicalInspectionComponent,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: VehicalInspectionAllComponent },
          { path: 'due', component: VehicalInspectionDueComponent },
          { path: 'incomplete', component: VehicalInspectionIncompleteComponent },
          { path: 'completed', component: VehicalInspectionCompletedComponent }
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
