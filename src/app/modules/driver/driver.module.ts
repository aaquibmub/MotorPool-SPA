import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverComponent } from './driver.component';
import { DriverRoutingModule } from './driver-routing.module';
import { DriverFormsComponent } from './components/driver-forms/driver-forms.component';
import { DriverEditComponent } from './components/driver-forms/driver-edit/driver-edit.component';
import { DriverPoolComponent } from './components/driver-pool/driver-pool.component';
import { DriversAllComponent } from './components/driver-pool/drivers-all/drivers-all.component';
import { DriversActiveComponent } from './components/driver-pool/drivers-active/drivers-active.component';
import { DriversInactiveComponent } from './components/driver-pool/drivers-inactive/drivers-inactive.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    DriverRoutingModule,

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
    DriverComponent,

    DriverFormsComponent,
    DriverEditComponent,

    DriverPoolComponent,
    DriversAllComponent,
    DriversActiveComponent,
    DriversInactiveComponent

  ]
})
export class DriverModule { }
