import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { PassengerEditComponent } from './components/passenger-forms/passenger-edit/passenger-edit.component';
import { PassengerFormsComponent } from './components/passenger-forms/passenger-forms.component';
import { PassengerListComponent } from './components/passenger-list/passenger-list.component';
import { PassengersActiveComponent } from './components/passenger-list/passengers-active/passengers-active.component';
import { PassengersAllComponent } from './components/passenger-list/passengers-all/passengers-all.component';
import { PassengersInactiveComponent } from './components/passenger-list/passengers-inactive/passengers-inactive.component';
import { PassengerComponent } from './passenger.component';

const routes: Routes = [
  {
    path: '',
    component: PassengerComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: '',
        redirectTo: '/passengers/list/all',
        pathMatch: 'full'
      },

      // passengers
      {
        path: 'passenger',
        component: PassengerFormsComponent,
        children: [
          {
            path: '',
            redirectTo: '/passengers/list/all',
            pathMatch: 'full'
          },
          { path: 'new', component: PassengerEditComponent },
          { path: ':id/edit', component: PassengerEditComponent },
        ]
      },
      {
        path: 'list',
        component: PassengerListComponent,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: PassengersAllComponent },
          { path: 'active', component: PassengersActiveComponent },
          { path: 'inactive', component: PassengersInactiveComponent },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengerRoutingModule {
}
