import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TripService } from 'src/app/helper/services/trips/trip.service';
import { DropdownType, OPM } from './../../../../../../helper/common/shared-types';
import { UtilityRix } from './../../../../../../helper/common/utility-rix';
import { DropdownItem } from './../../../../../../helper/models/common/dropdown/dropdown-item.model';
import { ResponseModel } from './../../../../../../helper/models/common/response-model';
import { TripPassengerModel } from './../../../../../../helper/models/trips/trip-edit/trip-passenger-model';
import { AlertService } from './../../../../../../helper/services/common/alert.service';
import { CommonService } from './../../../../../../helper/services/common/common.service';
import { UtilityService } from './../../../../../../helper/services/common/utility.service';

@Component({
  selector: 'app-trip-edit-passenger-add-new-popup',
  templateUrl: './trip-edit-passenger-add-new-popup.component.html',
  styleUrls: ['./trip-edit-passenger-add-new-popup.component.css']
})
export class TripEditPassengerAddNewPopupComponent implements OnInit {
  @Input() arg: any;

  form: UntypedFormGroup;
  model: TripPassengerModel;

  opmList: DropdownItem<OPM>[];

  constructor(
    private el: ElementRef,
    public utilityService: UtilityService,
    private tripService: TripService,
    private commonService: CommonService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.commonService.getDropdownList(DropdownType.Opm, '')
      .subscribe((list: DropdownItem<number>[]) => {
        this.opmList = list;
      });
  }

  private initForm(): void {
    this.form = new UntypedFormGroup({
      tripId: new UntypedFormControl(this.arg),
      passengerName: new UntypedFormControl('', [Validators.required]),
      opm: new UntypedFormControl(null, [UtilityRix.dropdownRequired as ValidatorFn]),
    });
  }

  submit(): void {
    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }
    this.model = this.form.value;
    this.tripService.addPassenger(this.model)
      .subscribe((response: ResponseModel<string>) => {
        if (response.hasError) {
          this.alertService.setErrorAlert(response.msg);
          return;
        }
        this.tripService.setTripPassengerPopup({
          show: false,
          arg: this.arg,
          passenger: {
            id: response.result,
            isActive: true,
            name: this.model.passengerName,
            opm: this.model.opm,
            ageGroup: null,
            gender: null,
            address: null,
            phoneNumber: null
          }
        });
      });
  }

  close(): void {
    this.tripService.setTripPassengerPopup({ show: false, arg: this.arg, item: null });
  }


}
