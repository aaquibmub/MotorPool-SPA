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
import { ReportPassengerTripsComponent } from './components/report-passengers/report-passenger-trips/report-passenger-trips.component';
import { ReportPassengersAllComponent } from './components/report-passengers/report-passengers-all/report-passengers-all.component';
import { ReportPassengersComponent } from './components/report-passengers/report-passengers.component';
import { ReportTripSheetComponent } from './components/report-trips/report-trip-sheet/report-trip-sheet.component';
import { ReportTripsAllComponent } from './components/report-trips/report-trips-all/report-trips-all.component';
import { ReportTripsDriverSheetComponent } from './components/report-trips/report-trips-driver-sheet/report-trips-driver-sheet.component';
import { ReportTripsOngoingComponent } from './components/report-trips/report-trips-ongoing/report-trips-ongoing.component';
import { ReportTripsPassengerSheetComponent } from './components/report-trips/report-trips-passenger-sheet/report-trips-passenger-sheet.component';
import { ReportTripsTodayComponent } from './components/report-trips/report-trips-today/report-trips-today.component';
import { ReportTripsUpcomingComponent } from './components/report-trips/report-trips-upcoming/report-trips-upcoming.component';
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
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: ReportTripsAllComponent },
          { path: 'today', component: ReportTripsTodayComponent },
          { path: 'ongoing', component: ReportTripsOngoingComponent },
          { path: 'upcoming', component: ReportTripsUpcomingComponent },
          { path: 'ongoing', component: ReportTripsOngoingComponent },
          { path: 'driver-sheet', component: ReportTripsDriverSheetComponent },
          { path: 'passenger-sheet', component: ReportTripsPassengerSheetComponent },
          { path: 'vehicle-sheet', component: ReportTripsVehicleSheetComponent },
          { path: 'trip-sheet', component: ReportTripSheetComponent },
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
        path: 'passengers',
        component: ReportPassengersComponent,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: ReportPassengersAllComponent },
          { path: 'trips', component: ReportPassengerTripsComponent },
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
