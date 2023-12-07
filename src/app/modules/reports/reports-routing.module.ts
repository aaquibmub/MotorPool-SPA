import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ActitvityLogComponent } from './components/logs/actitvity-log/actitvity-log.component';
import { LogsComponent } from './components/logs/logs.component';
import { SystemLogComponent } from './components/logs/system-log/system-log.component';
import { ReportTripsDriverSheetComponent } from './components/report-trips/report-trips-driver-sheet/report-trips-driver-sheet.component';
import { ReportTripsPassengerSheetComponent } from './components/report-trips/report-trips-passenger-sheet/report-trips-passenger-sheet.component';
import { ReportTripsComponent } from './components/report-trips/report-trips.component';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'trips',
        component: ReportTripsComponent,
        children: [
          { path: '', redirectTo: 'driver-sheet', pathMatch: 'full' },
          { path: 'driver-sheet', component: ReportTripsDriverSheetComponent },
          { path: 'passenger-sheet', component: ReportTripsPassengerSheetComponent }
        ]
      },
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
