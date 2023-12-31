import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { AddressModel } from 'src/app/helper/models/address/address-model';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { AddressService } from 'src/app/helper/services/address/address.service';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { CommonService } from 'src/app/helper/services/common/common.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {

  id: string;
  editMode = false;
  model: AddressModel;
  form: UntypedFormGroup;

  typeList: DropdownItem<string>[];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    public utilityService: UtilityService,
    private commonService: CommonService,
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.route.params
      .subscribe((params: Params) => {
        if (params.id != null) {
          this.id = params.id;
          this.addressService.get(params.id)
            .subscribe((model: AddressModel) => {
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

    let address: string = null;
    let status: boolean = false;

    if (this.model) {
      address = this.model.address;
      status = this.model.status;
    }

    this.form = new UntypedFormGroup({
      address: new UntypedFormControl(
        address, [Validators.required]),
      status: new UntypedFormControl(
        status, [Validators.required]),
    });

  }

  cancel(): void {
    this.router.navigate(['/addresses/list/all/']);
  }

  submit(): void {
    if (!this.form.valid) {
      debugger;
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    const formValue = this.form.value as AddressModel;
    formValue.id = this.id;
    const primaryAction = this.editMode ? 'Update' : 'Create';
    const successAction = this.editMode ? 'Updated' : 'Created';
    const primaryMsg = 'Do you want to ' + primaryAction + ' address?';

    const dialog: DialogRef = this.dialogService
      .open(this.alertService.getConfirmDialougeConfig(
        'Confirm ' + primaryAction, primaryMsg, primaryAction));

    dialog.result.subscribe((result: any) => {
      if (result.text === primaryAction) {
        this.addressService.addUpdate(formValue)
          .subscribe(
            (response: ResponseModel<string>) => {

              if (response.hasError) {
                this.alertService.setErrorAlert(response.msg);
                return;
              }

              this.alertService.setSuccessAlert(
                'Address is '
                + successAction
                + ' successfully');

              this.utilityService.redirectToUrl('/addresses/list/all');

            }
          );
      }
    });
  }

}
