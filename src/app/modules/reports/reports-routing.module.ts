import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ActitvityLogComponent } from './components/logs/actitvity-log/actitvity-log.component';
import { LogsComponent } from './components/logs/logs.component';
import { SystemLogComponent } from './components/logs/system-log/system-log.component';
import { ReportDriverMilageComponent } from './components/report-drivers/report-driver-milage/report-driver-milage.component';
import { ReportDriverTripsComponent } from './components/report-drivers/report-driver-trips/report-driver-trips.component';
import { ReportDriversAllComponent } from './components/report-drivers/report-drivers-all/report-drivers-all.component';
import { ReportDriversComponent } from './components/report-drivers/report-drivers.component';
import { ReportTripSheetComponent } from './components/report-trips/report-trip-sheet/report-trip-sheet.component';
import { ReportTripsDriverSheetComponent } from './components/report-trips/report-trips-driver-sheet/report-trips-driver-sheet.component';
import { ReportTripsPassengerSheetComponent } from './components/report-trips/report-trips-passenger-sheet/report-trips-passenger-sheet.component';
import { ReportTripsVehicleSheetComponent } from './components/report-trips/report-trips-vehicle-sheet/report-trips-vehicle-sheet.component';
import { ReportTripsComponent } from './components/report-trips/report-trips.component';
import { ReportVehiclesAllComponent } from './components/report-vehicles/report-vehicles-all/report-vehicles-all.component';
import { ReportVehiclesComponent } from './components/report-vehicles/report-vehicles.component';
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
          { path: 'passenger-sheet', component: ReportTripsPassengerSheetComponent },
          { path: 'vehicle-sheet', component: ReportTripsVehicleSheetComponent },
          { path: 'trip-sheet', component: ReportTripSheetComponent }
        ]
      },
      {
        path: 'vehicles',
        component: ReportVehiclesComponent,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: ReportVehiclesAllComponent },
        ]
      },
      {
        path: 'drivers',
        component: ReportDriversComponent,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: ReportDriversAllComponent },
          { path: 'trips', component: ReportDriverTripsComponent },
          { path: 'milage', component: ReportDriverMilageComponent },
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
