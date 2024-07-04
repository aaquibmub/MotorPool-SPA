import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { DropdownType, Gender, OPM } from 'src/app/helper/common/shared-types';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { PassengerModel } from 'src/app/helper/models/passengers/passenger-model';
import { AddressService } from 'src/app/helper/services/address/address.service';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { CommonService } from 'src/app/helper/services/common/common.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { PassangerService } from 'src/app/helper/services/passanger/passanger.service';
import { AgeGroupService } from 'src/app/helper/services/utilities/age-group.service';

@Component({
  selector: 'app-passenger-edit',
  templateUrl: './passenger-edit.component.html',
  styleUrls: ['./passenger-edit.component.css']
})
export class PassengerEditComponent implements OnInit {

  id: string;
  editMode = false;
  model: PassengerModel;
  form: UntypedFormGroup;

  genderList: DropdownItem<number>[];
  ageGroupList: DropdownItem<string>[];
  opmList: DropdownItem<OPM>[];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    public utilityService: UtilityService,
    private commonService: CommonService,
    private passangerService: PassangerService,
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute,
    private ageGroupService: AgeGroupService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        if (params.id != null) {
          this.id = params.id;
          this.passangerService.get(params.id)
            .subscribe((model: PassengerModel) => {
              this.model = model;
              this.editMode = true;
              this.initForm();
            });
        } else {
          this.initForm();
        }
      });

    this.commonService.getDropdownList(DropdownType.Gender, '')
      .subscribe((list: DropdownItem<number>[]) => {
        this.genderList = list;
      });
    this.commonService.getDropdownList(DropdownType.Opm, '')
      .subscribe((list: DropdownItem<number>[]) => {
        this.opmList = list;
      });

    this.ageGroupService.getDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.ageGroupList = list;
      });
  }

  private initForm(): void {

    let isActive: boolean = false;
    let name: string = null;
    let gender: DropdownItem<Gender> = null;
    let ageGroup: DropdownItem<string> = null;
    let opm: DropdownItem<OPM> = null;
    let phoneNumber: string = null;
    let address: DropdownItem<string> = null;
    debugger;
    if (this.model) {
      isActive = this.model.isActive;
      name = this.model.name;
      gender = this.model.gender;
      ageGroup = this.model.ageGroup;
      opm = this.model.opm;
      phoneNumber = this.model.phoneNumber;
      address = this.model.address;
    }

    this.form = new UntypedFormGroup({
      isActive: new UntypedFormControl(
        isActive, [Validators.required]),
      name: new UntypedFormControl(
        name, [Validators.required]),
      gender: new UntypedFormControl(
        gender, [UtilityRix.dropdownRequired as ValidatorFn]),
      ageGroup: new UntypedFormControl(
        ageGroup, [UtilityRix.dropdownRequired as ValidatorFn]),
      opm: new UntypedFormControl(
        opm, [UtilityRix.dropdownRequired as ValidatorFn]),
      phoneNumber: new UntypedFormControl(
        phoneNumber, [Validators.required]),
      address: new UntypedFormControl(
        address, [Validators.required]),
    });

  }

  cancel(): void {
    this.router.navigate(['/passengers/list/all/']);
  }

  submit(): void {
    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    const formValue = this.form.value as PassengerModel;
    formValue.id = this.id;
    const primaryAction = this.editMode ? 'Update' : 'Create';
    const successAction = this.editMode ? 'Updated' : 'Created';
    const primaryMsg = 'Do you want to ' + primaryAction + ' passenger?';

    const dialog: DialogRef = this.dialogService
      .open(this.alertService.getConfirmDialougeConfig(
        'Confirm ' + primaryAction, primaryMsg, primaryAction));

    dialog.result.subscribe((result: any) => {
      if (result.text === primaryAction) {
        this.passangerService.addUpdate(formValue)
          .subscribe(
            (response: ResponseModel<string>) => {

              if (response.hasError) {
                this.alertService.setErrorAlert(response.msg);
                return;
              }

              this.alertService.setSuccessAlert(
                'Passenger is '
                + successAction
                + ' successfully');

              this.utilityService.redirectToUrl('/passengers/list/all');

            }
          );
      }
    });
  }

}
