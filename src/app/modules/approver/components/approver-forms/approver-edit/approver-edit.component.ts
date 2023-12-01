import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ApproverModel } from 'src/app/helper/models/approver/approver-model';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { CommonService } from 'src/app/helper/services/common/common.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { ApproverService } from 'src/app/helper/services/trips/approver.service';

@Component({
  selector: 'app-approver-edit',
  templateUrl: './approver-edit.component.html',
  styleUrls: ['./approver-edit.component.scss']
})
export class ApproverEditComponent implements OnInit {
  id: string;
  editMode = false;
  model: ApproverModel;
  form: UntypedFormGroup;

  typeList: DropdownItem<string>[];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    public utilityService: UtilityService,
    private commonService: CommonService,
    private approverService: ApproverService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.route.params
      .subscribe((params: Params) => {
        if (params.id != null) {
          this.id = params.id;
          this.approverService.get(params.id)
            .subscribe((model: ApproverModel) => {
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
    let status: boolean = false;

    if (this.model) {
      name = this.model.name;
      status = this.model.status;
    }

    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(
        name, [Validators.required]),
      status: new UntypedFormControl(
        status, [Validators.required]),
    });

  }

  cancel(): void {
    this.router.navigate(['/approvers/list/all/']);
  }

  submit(): void {
    if (!this.form.valid) {
      debugger;
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    const formValue = this.form.value as ApproverModel;
    formValue.id = this.id;
    const primaryAction = this.editMode ? 'Update' : 'Create';
    const successAction = this.editMode ? 'Updated' : 'Created';
    const primaryMsg = 'Do you want to ' + primaryAction + ' address?';

    const dialog: DialogRef = this.dialogService
      .open(this.alertService.getConfirmDialougeConfig(
        'Confirm ' + primaryAction, primaryMsg, primaryAction));

    dialog.result.subscribe((result: any) => {
      if (result.text === primaryAction) {
        this.approverService.addUpdate(formValue)
          .subscribe(
            (response: ResponseModel<string>) => {

              if (response.hasError) {
                this.alertService.setErrorAlert(response.msg);
                return;
              }

              this.alertService.setSuccessAlert(
                'Approver is '
                + successAction
                + ' successfully');

              this.utilityService.redirectToUrl('/approvers/list/all');

            }
          );
      }
    });
  }

}
