import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { IncidentCategoryEditComponent } from './components/incident-category-forms/incident-category-edit/incident-category-edit.component';
import { IncidentCategoryFormsComponent } from './components/incident-category-forms/incident-category-forms.component';
import { IncidentCategoryAllComponent } from './components/incident-category-list/incident-category-all/incident-category-all.component';
import { IncidentCategoryListComponent } from './components/incident-category-list/incident-category-list.component';
import { IncidentComponent } from './incident.component';

const routes: Routes = [
  {
    path: '',
    component: IncidentComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: '',
        redirectTo: '/incident/list/all',
        pathMatch: 'full'
      },

      // passengers
      {
        path: 'category',
        component: IncidentCategoryFormsComponent,
        children: [
          {
            path: '',
            redirectTo: '/incident/list/all',
            pathMatch: 'full'
          },
          { path: 'new', component: IncidentCategoryEditComponent },
          { path: ':id/edit', component: IncidentCategoryEditComponent },
        ]
      },
      {
        path: 'list',
        component: IncidentCategoryListComponent,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: IncidentCategoryAllComponent },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentRoutingModule {
}
