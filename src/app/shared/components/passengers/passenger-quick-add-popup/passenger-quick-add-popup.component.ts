import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DropdownType, OPM } from 'src/app/helper/common/shared-types';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { AgeGroupService } from 'src/app/helper/services/utilities/age-group.service';
import { UtilityRix } from './../../../../helper/common/utility-rix';
import { DropdownItem } from './../../../../helper/models/common/dropdown/dropdown-item.model';
import { ResponseModel } from './../../../../helper/models/common/response-model';
import { PassengerModel } from './../../../../helper/models/passengers/passenger-model';
import { AlertService } from './../../../../helper/services/common/alert.service';
import { CommonService } from './../../../../helper/services/common/common.service';
import { PassengerService } from './../../../../helper/services/trips/passenger.service';

@Component({
  selector: 'app-passenger-quick-add-popup',
  templateUrl: './passenger-quick-add-popup.component.html',
  styleUrls: ['./passenger-quick-add-popup.component.css']
})
export class PassengerQuickAddPopupComponent implements OnInit {
  @Input() arg: any;

  form: UntypedFormGroup;
  model: PassengerModel;

  genderList: DropdownItem<number>[];
  ageGroupList: DropdownItem<string>[];
  opmList: DropdownItem<OPM>[];

  constructor(
    private el: ElementRef,
    public utilityService: UtilityService,
    private passengerService: PassengerService,
    private commonService: CommonService,
    private ageGroupService: AgeGroupService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.initForm();

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
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required]),
      gender: new UntypedFormControl(null, [UtilityRix.dropdownRequired as ValidatorFn]),
      ageGroup: new UntypedFormControl(null, [UtilityRix.dropdownRequired as ValidatorFn]),
      opm: new UntypedFormControl(null, [UtilityRix.dropdownRequired as ValidatorFn]),
      phoneNumber: new UntypedFormControl('', [Validators.required]),
      address: new UntypedFormControl(null, [Validators.required]),
    });
  }

  submit(): void {
    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }
    this.model = this.form.value;
    this.model.isActive = true;
    this.passengerService.addUpdate(this.model)
      .subscribe((response: ResponseModel<string>) => {
        if (response.hasError) {
          this.alertService.setErrorAlert(response.msg);
          return;
        }
        this.passengerService.setQuickAddPopup({
          show: false,
          arg: this.arg,
          passenger: {
            ...this.model,
            id: response.result
          }
        });
      });
  }

  close(): void {
    this.passengerService.setQuickAddPopup({ show: false, arg: this.arg, item: null });
  }


}
