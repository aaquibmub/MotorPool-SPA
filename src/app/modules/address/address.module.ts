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
import { AddressRoutingModule } from './address-routing.module';
import { AddressComponent } from './address.component';
import { AddressEditComponent } from './components/address-forms/address-edit/address-edit.component';
import { AddressFormsComponent } from './components/address-forms/address-forms.component';
import { AddressListComponent } from './components/address-list/address-list.component';
import { AddressesAllComponent } from './components/address-list/addresses-all/addresses-all.component';

@NgModule({
  imports: [
    CommonModule,
    AddressRoutingModule,

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
    AddressComponent,

    AddressListComponent,
    AddressesAllComponent,

    AddressFormsComponent,
    AddressEditComponent,

  ]
})
export class AddressModule { }
