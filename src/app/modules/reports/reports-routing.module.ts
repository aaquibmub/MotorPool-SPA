import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { AuthGuard } from '../auth/auth.guard';
import { NgModule } from '@angular/core';
import { LogsComponent } from './components/logs/logs.component';
import { SystemLogComponent } from './components/logs/system-log/system-log.component';
import { ActitvityLogComponent } from './components/logs/actitvity-log/actitvity-log.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'logs',
        component: LogsComponent,
        children: [
          { path: '', redirectTo: 'system', pathMatch: 'full' },
          { path: 'system', component: SystemLogComponent },
          { path: 'activity', component: ActitvityLogComponent }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {
}
