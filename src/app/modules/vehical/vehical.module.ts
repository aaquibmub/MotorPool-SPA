import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { SharedModule } from 'src/app/shared/shared.module';
import { VehicalEditComponent } from './components/vehical-forms/vehical-edit/vehical-edit.component';
import { VehicalFormsComponent } from './components/vehical-forms/vehical-forms.component';
import { VehicalPoolComponent } from './components/vehical-pool/vehical-pool.component';
import { VehicalsActiveComponent } from './components/vehical-pool/vehicals-active/vehicals-active.component';
import { VehicalsAllComponent } from './components/vehical-pool/vehicals-all/vehicals-all.component';
import { VehicalsGrippedComponent } from './components/vehical-pool/vehicals-gripped/vehicals-gripped.component';
import { VehicalsInactiveComponent } from './components/vehical-pool/vehicals-inactive/vehicals-inactive.component';
import { VehicalsMaintenanceComponent } from './components/vehical-pool/vehicals-maintenance/vehicals-maintenance.component';
import { VehicalRoutingModule } from './vehical-routing.module';
import { VehicalComponent } from './vehical.component';
import { VehicalViewComponent } from './components/vehical-view/vehical-view.component';
import { VehicalViewDetailComponent } from './components/vehical-view/vehical-view-detail/vehical-view-detail.component';
import { VehicalViewTripsComponent } from './components/vehical-view/vehical-view-trips/vehical-view-trips.component';
import { VehicalViewInspectionsComponent } from './components/vehical-view/vehical-view-inspections/vehical-view-inspections.component';
import { VehicalViewDriversComponent } from './components/vehical-view/vehical-view-drivers/vehical-view-drivers.component';

@NgModule({
  imports: [
    CommonModule,
    VehicalRoutingModule,

    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    DropDownsModule,
    DateInputsModule,
    InputsModule,
    GridModule,
    ButtonsModule,
    TranslateModule.forChild()
  ],
  declarations: [
    VehicalComponent,

    VehicalFormsComponent,
    VehicalEditComponent,

    VehicalPoolComponent,
    VehicalsAllComponent,
    VehicalsActiveComponent,
    VehicalsInactiveComponent,
    VehicalsMaintenanceComponent,
    VehicalsGrippedComponent,
    VehicalViewComponent,
    VehicalViewDetailComponent,
    VehicalViewTripsComponent,
    VehicalViewInspectionsComponent,
    VehicalViewDriversComponent,

  ]
})
export class VehicalModule { }
