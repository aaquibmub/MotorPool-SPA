import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ResponseModel } from './../../../../../helper/models/common/response-model';
import { IncidentCategoryModel } from './../../../../../helper/models/incidents/incident-category-model';
import { AlertService } from './../../../../../helper/services/common/alert.service';
import { CommonService } from './../../../../../helper/services/common/common.service';
import { UtilityService } from './../../../../../helper/services/common/utility.service';
import { IncidentService } from './../../../../../helper/services/trips/incident.service';

@Component({
  selector: 'app-incident-category-edit',
  templateUrl: './incident-category-edit.component.html',
  styleUrls: ['./incident-category-edit.component.css']
})
export class IncidentCategoryEditComponent implements OnInit {

  id: string;
  editMode = false;
  model: IncidentCategoryModel;
  form: UntypedFormGroup;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    public utilityService: UtilityService,
    private commonService: CommonService,
    private incidentService: IncidentService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.route.params
      .subscribe((params: Params) => {
        if (params.id != null) {
          this.id = params.id;
          this.incidentService.getCategory(params.id)
            .subscribe((model: IncidentCategoryModel) => {
              this.model = model;
              this.editMode = true;
              this.initForm();
            });
        } else {
          this.initForm();
        }
      });

  }

  private initForm(): void {

    let name: string = null;
    let active: boolean = false;

    if (this.model) {
      name = this.model.name;
      active = this.model.active;
    }

    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(
        name, [Validators.required]),
      active: new UntypedFormControl(
        active, [Validators.required]),
    });

  }

  cancel(): void {
    this.router.navigate(['/incident/list/all/']);
  }

  submit(): void {
    if (!this.form.valid) {
      debugger;
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    const formValue = this.form.value as IncidentCategoryModel;
    formValue.id = this.id;
    const primaryAction = this.editMode ? 'Update' : 'Create';
    const successAction = this.editMode ? 'Updated' : 'Created';
    const primaryMsg = 'Do you want to ' + primaryAction + ' address?';

    const dialog: DialogRef = this.dialogService
      .open(this.alertService.getConfirmDialougeConfig(
        'Confirm ' + primaryAction, primaryMsg, primaryAction));

    dialog.result.subscribe((result: any) => {
      if (result.text === primaryAction) {
        this.incidentService.addUpdateCategory(formValue)
          .subscribe(
            (response: ResponseModel<string>) => {

              if (response.hasError) {
                this.alertService.setErrorAlert(response.msg);
                return;
              }

              this.alertService.setSuccessAlert(
                'Incident Category is '
                + successAction
                + ' successfully');

              this.utilityService.redirectToUrl('/incident/list/all');

            }
          );
      }
    });
  }

}
