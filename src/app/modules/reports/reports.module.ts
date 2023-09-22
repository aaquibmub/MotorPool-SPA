import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ReportsRoutingModule } from './reports-routing.module';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { LogsComponent } from './components/logs/logs.component';
import { SystemLogComponent } from './components/logs/system-log/system-log.component';
import { ActitvityLogComponent } from './components/logs/actitvity-log/actitvity-log.component';

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
    GridModule
  ],
  declarations: [
    ReportsComponent,
    LogsComponent,
    SystemLogComponent,
    ActitvityLogComponent,
  ]
})
export class ReportsModule { }
