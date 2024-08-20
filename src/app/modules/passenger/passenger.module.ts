import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { SharedModule } from './../../shared/shared.module';
import { PassengerEditComponent } from './components/passenger-forms/passenger-edit/passenger-edit.component';
import { PassengerFormsComponent } from './components/passenger-forms/passenger-forms.component';
import { PassengerListComponent } from './components/passenger-list/passenger-list.component';
import { PassengersActiveComponent } from './components/passenger-list/passengers-active/passengers-active.component';
import { PassengersAllComponent } from './components/passenger-list/passengers-all/passengers-all.component';
import { PassengersInactiveComponent } from './components/passenger-list/passengers-inactive/passengers-inactive.component';
import { PassengerRoutingModule } from './passenger-routing.module';
import { PassengerComponent } from './passenger.component';

@NgModule({
  imports: [
    CommonModule,
    PassengerRoutingModule,

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
    PassengerComponent,

    PassengerListComponent,
    PassengersAllComponent,
    PassengersActiveComponent,
    PassengersInactiveComponent,

    PassengerFormsComponent,
    PassengerEditComponent,

  ]
})
export class PassengerModule { }
