import { Component, OnInit, ElementRef } from '@angular/core';
import { DriverModel } from 'src/app/helper/models/drivers/driver-model';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DropdownItem } from "../../../../../helper/models/common/dropdown/dropdown-item.model";
import { VehicalTypeService } from 'src/app/helper/services/vehicals/vehical-type.service';
import { DriverService } from 'src/app/helper/services/drivers/driver.service';
import { ActivatedRoute, Router } from '@angular/router';
import {CommonService} from "../../../../../helper/services/common/common.service";
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { ResponseModel } from 'src/app/helper/models/common/response-model';

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.css']
})
export class DriverEditComponent implements OnInit {

  id: string;
  model: DriverModel;
  form: UntypedFormGroup;
  nationalityList: DropdownItem<string>[];
  countryList: DropdownItem<string>[];

  editMode = false;
  constructor(
    private driverNationalityService: VehicalTypeService,
    private driverService: DriverService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private router: Router,
    public utilityService: UtilityService,
    private el: ElementRef,
    private dialogService: DialogService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {

    this.route.params
      .subscribe(() => {
          this.initForm();
      });

    this.driverNationalityService.getDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.nationalityList = list;
      });

    this.commonService.getCountryDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.countryList = list;
      });
  }

  private initForm(): void {

    let firstName: string = '';
    let middleName: string = '';
    let lastName: string = '';
    let idNumber: string = '';
    let nationality: DropdownItem<string>;
    let mobileNumber: string = '';
    let emailAddress: string = '';
    let userId: string = '';
    let password: string = '';

    if (this.model) {
      firstName = this.model.firstName;
      middleName = this.model.middleName;
      lastName = this.model.lastName;
      nationality = this.model.nationality;
      idNumber = this.model.idNumber;
      mobileNumber = this.model.mobileNumber;
      emailAddress = this.model.emailAddress;
      userId = this.model.userId;
      password = this.model.password;
    }

    this.form = new UntypedFormGroup({
      firstName: new UntypedFormControl(
        firstName, [Validators.required]),
      middleName: new UntypedFormControl(
        middleName, [Validators.required]),
      lastName: new UntypedFormControl(
        lastName, [Validators.required]),
      nationality: new UntypedFormControl(
        nationality, [Validators.required]),
      idNumber: new UntypedFormControl(
        idNumber, [Validators.required]),
      mobileNumber: new UntypedFormControl(
        mobileNumber, [Validators.required]),
      emailAddress: new UntypedFormControl(
        emailAddress, [Validators.required]),
      userId: new UntypedFormControl(
        userId, [Validators.required]),
      password: new UntypedFormControl(
        password, [Validators.required]),
    });

  }

  cancel(): void {
    this.router.navigate(['/drivers/pool/all/']);
  }

  submit(): void {
    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    const formValue = this.form.value as DriverModel;
    formValue.id = this.id;
    const primaryAction = this.editMode ? 'Update' : 'Create';
    const successAction = this.editMode ? 'Updated' : 'Created';
    const primaryMsg = 'Do you want to ' + primaryAction + ' vehical?';

    const dialog: DialogRef = this.dialogService
      .open(this.alertService.getConfirmDialougeConfig(
        'Confirm ' + primaryAction, primaryMsg, primaryAction));

    dialog.result.subscribe((result: any) => {
      if (result.text === primaryAction) {
        this.driverService.addUpdate(formValue)
          .subscribe(
            (response: ResponseModel<string>) => {

              if (response.hasError) {
                this.alertService.setErrorAlert(response.msg);
                return;
              }

              this.alertService.setSuccessAlert(
                'Vehical is '
                + successAction
                + ' successfully');

              this.utilityService.redirectToUrl('/vehicals/pool/all');

            }
          );
      }
    });
  }


}
