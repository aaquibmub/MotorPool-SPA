import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ExcelModule, FilterService, GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { NgxPrintModule } from 'ngx-print';
import { SharedModule } from 'src/app/shared/shared.module';
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
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DropDownsModule,
    DateInputsModule,
    FormsModule,
    ReportsRoutingModule,
    InputsModule,
    GridModule,
    ExcelModule,
    NgxPrintModule,
    TranslateModule.forChild()
  ],
  declarations: [
    ReportsComponent,
    LogsComponent,
    SystemLogComponent,
    ActitvityLogComponent,

    ReportTripsComponent,
    ReportTripsDriverSheetComponent,
    ReportTripsPassengerSheetComponent,
    ReportTripsVehicleSheetComponent,
    ReportTripSheetComponent,
    ReportTripsAllComponent,
    ReportTripsTodayComponent,
    ReportTripsOngoingComponent,
    ReportTripsUpcomingComponent,

    ReportVehiclesComponent,
    ReportVehiclesAllComponent,

    ReportDriversComponent,
    ReportDriversAllComponent,
    ReportDriverTripsComponent,
    ReportDriverMilageComponent,

    ReportPassengersComponent,
    ReportPassengersAllComponent,
    ReportPassengerTripsComponent
  ],
  providers: [FilterService]
})
export class ReportsModule { }
