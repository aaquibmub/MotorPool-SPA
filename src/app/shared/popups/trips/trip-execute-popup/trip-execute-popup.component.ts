import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { VehicalModel } from 'src/app/helper/models/vehicals/vehical-model';
import { VehicalService } from 'src/app/helper/services/vehicals/vehical.service';
import { DropdownItem } from '../../../../helper/models/common/dropdown/dropdown-item.model';
import { ResponseModel } from '../../../../helper/models/common/response-model';
import { TripExecuteModel } from '../../../../helper/models/trips/enroute/trip-execute-model';
import { AlertService } from '../../../../helper/services/common/alert.service';
import { UtilityService } from '../../../../helper/services/common/utility.service';
import { DriverService } from '../../../../helper/services/drivers/driver.service';
import { TripService } from '../../../../helper/services/trips/trip.service';

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
  vehicalList: VehicalModel[];

  constructor(
    public utilityService: UtilityService,
    private tripService: TripService,
    private driverService: DriverService,
    private vehicalService: VehicalService,
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

  handleDriverValueChange(value: DropdownItem<string>): void {
    if (!value) {
      return;
    }

    this.vehicalService.getVehicalByDriverId(value.value)
      .subscribe(
        (response: ResponseModel<VehicalModel[]>) => {
          if (response.hasError) {
            return;
          }
          this.vehicalList = response.result;
          const vehcial = response.result[0];

          if (vehcial) {

            this.form.get('vehical').setValue({
              text: vehcial.make + ' '
                + vehcial.model + ' '
                + vehcial.modelYear.toString(),
              value: vehcial.id
            });

            this.form.get('registrationPlate').setValue(vehcial.registrationPlate);
          }

        }
      );
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
