import { CommonService } from './../../../../helper/services/common/common.service';
import { DropdownItem } from './../../../../helper/models/common/dropdown/dropdown-item.model';
import { UtilityRix } from './../../../../helper/common/utility-rix';
import { ResponseModel } from './../../../../helper/models/common/response-model';
import { AlertService } from './../../../../helper/services/common/alert.service';
import { PassengerService } from './../../../../helper/services/trips/passenger.service';
import { PassengerModel } from './../../../../helper/models/passengers/passenger-model';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DropdownType } from 'src/app/helper/common/shared-types';
import { UtilityService } from 'src/app/helper/services/common/utility.service';

@Component({
  selector: 'app-passenger-quick-add-popup',
  templateUrl: './passenger-quick-add-popup.component.html',
  styleUrls: ['./passenger-quick-add-popup.component.css']
})
export class PassengerQuickAddPopupComponent implements OnInit {
  form: UntypedFormGroup;
  model: PassengerModel;

  genderList: DropdownItem<number>[];

  constructor(
    public utilityService: UtilityService,
    private passengerService: PassengerService,
    private commonService: CommonService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.commonService.getDropdownList(DropdownType.Gender, '')
      .subscribe((list: DropdownItem<number>[]) => {
        this.genderList = list;
      });
  }

  private initForm(): void {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required]),
      gender: new UntypedFormControl(null, [UtilityRix.dropdownRequired as ValidatorFn]),
      ageGroup: new UntypedFormControl(null, [UtilityRix.dropdownRequired as ValidatorFn]),
      opm: new UntypedFormControl(null, [UtilityRix.dropdownRequired as ValidatorFn]),
      phoneNumber: new UntypedFormControl('', [Validators.required]),
      address: new UntypedFormControl(null, [UtilityRix.dropdownRequired as ValidatorFn]),
    });
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }
    this.model = this.form.value;
    this.passengerService.addUpdate(this.model)
      .subscribe((response: ResponseModel<PassengerModel>) => {
        if (response.hasError) {
          this.alertService.setErrorAlert(response.msg);
          return;
        }
        this.passengerService.setQuickAddPopup(false);
        this.passengerService.setSelectedModel(response.result);
      });
  }

  close(): void {
    this.passengerService.setQuickAddPopup(false);
  }


}
