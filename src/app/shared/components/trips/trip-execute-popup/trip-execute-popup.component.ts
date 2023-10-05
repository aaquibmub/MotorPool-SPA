import { ResponseModel } from './../../../../helper/models/common/response-model';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { DriverService } from './../../../../helper/services/drivers/driver.service';
import { AlertService } from './../../../../helper/services/common/alert.service';
import { CommonService } from './../../../../helper/services/common/common.service';
import { TripService } from './../../../../helper/services/trips/trip.service';
import { UtilityService } from './../../../../helper/services/common/utility.service';
import { DropdownItem } from './../../../../helper/models/common/dropdown/dropdown-item.model';
import { TripExecuteModel } from './../../../../helper/models/trips/enroute/trip-execute-model';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-trip-execute-popup',
  templateUrl: './trip-execute-popup.component.html',
  styleUrls: ['./trip-execute-popup.component.css']
})
export class TripExecutePopupComponent implements OnInit {
  @Input() tripId: string;
  form: UntypedFormGroup;
  model: TripExecuteModel;

  driverList: DropdownItem<string>[];

  constructor(
    public utilityService: UtilityService,
    private tripService: TripService,
    private driverService: DriverService,
    private commonService: CommonService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.tripService.getTripExecuteModel(this.tripId)
      .subscribe(
        (model: TripExecuteModel) => {
          this.model = model;

          this.initForm();
        }
      );

    this.driverService.getDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.driverList = list;
      });
  }

  private initForm(): void {
    this.form = new UntypedFormGroup({
      driver: new UntypedFormControl(
        this.model.driver, [UtilityRix.dropdownRequired as ValidatorFn]
      ),
      vehical: new UntypedFormControl(
        this.model.vehical, [UtilityRix.dropdownRequired as ValidatorFn]
      ),
      notes: new UntypedFormControl(null)
    });
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }
    this.model = this.form.value;
    this.model.id = this.tripId;
    this.tripService.executeTrip(this.model)
      .subscribe((response: ResponseModel<string>) => {
        if (response.hasError) {
          this.alertService.setErrorAlert(response.msg);
          return;
        }
        this.tripService.setTripExecutePopup(false);
      });
  }

  close(): void {
    this.tripService.setTripExecutePopup(false);
  }


}
