import { CommonModule } from "@angular/common";
import { ApproverRoutingModule } from "./approver-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputsModule, SharedModule } from "@progress/kendo-angular-inputs";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { GridModule } from "@progress/kendo-angular-grid";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { TranslateModule } from "@ngx-translate/core";
import { ApproverComponent } from "./approver.component";
import { ApproverListComponent } from "./components/approver-list/approver-list.component";
import { ApproversAllComponent } from "./components/approver-list/approvers-all/approvers-all.component";
import { ApproverFormsComponent } from "./components/approver-forms/approver-forms.component";
import { ApproverEditComponent } from "./components/approver-forms/approver-edit/approver-edit.component";
import { NgModule } from "@angular/core";

@NgModule({
    imports: [
      CommonModule,
      ApproverRoutingModule,
  
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
      ApproverComponent,
  
      ApproverListComponent,
      ApproversAllComponent,
  
      ApproverFormsComponent,
      ApproverEditComponent,
  
    ]
  })

  export class ApproverModule { }