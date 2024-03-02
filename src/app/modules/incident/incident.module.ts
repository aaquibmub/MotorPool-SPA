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
import { IncidentCategoryEditComponent } from './components/incident-category-forms/incident-category-edit/incident-category-edit.component';
import { IncidentCategoryFormsComponent } from './components/incident-category-forms/incident-category-forms.component';
import { IncidentCategoryAllComponent } from './components/incident-category-list/incident-category-all/incident-category-all.component';
import { IncidentCategoryListComponent } from './components/incident-category-list/incident-category-list.component';
import { IncidentRoutingModule } from './incident-routing.module';
import { IncidentComponent } from './incident.component';

@NgModule({
  imports: [
    CommonModule,
    IncidentRoutingModule,

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
    IncidentComponent,


    IncidentCategoryListComponent,
    IncidentCategoryAllComponent,

    IncidentCategoryFormsComponent,
    IncidentCategoryEditComponent,

  ]
})
export class IncidentModule { }
