import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { VehicalModel } from 'src/app/helper/models/vehicals/vehical-model';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { DriverService } from 'src/app/helper/services/drivers/driver.service';
import { TripService } from 'src/app/helper/services/trips/trip.service';
import { VehicalService } from 'src/app/helper/services/vehicals/vehical.service';
import { TripHandoverModel } from './../../../../helper/models/trips/enroute/trip-handover-model';

@Component({
  selector: 'app-trip-handover-popup',
  templateUrl: './trip-handover-popup.component.html',
  styleUrls: ['./trip-handover-popup.component.css']
})
export class TripHandoverPopupComponent implements OnInit {
  @Input() tripId: string;
  form: UntypedFormGroup;
  model: TripHandoverModel;

  driverList: DropdownItem<string>[];

  constructor(
    public utilityService: UtilityService,
    private tripService: TripService,
    private driverService: DriverService,
    private vehicalService: VehicalService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.tripService.getTripHandoverModel(this.tripId)
      .subscribe(
        (model: TripHandoverModel) => {
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
      newDriver: new UntypedFormControl(
        this.model.newDriver, [UtilityRix.dropdownRequired as ValidatorFn]
      ),
      newVehical: new UntypedFormControl(
        this.model.newVehical, [UtilityRix.dropdownRequired as ValidatorFn]
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
        (response: ResponseModel<VehicalModel>) => {
          if (response.hasError) {
            return;
          }

          const vehcial = response.result as VehicalModel;

          this.form.get('newVehical').setValue({
            text: vehcial.make + ' '
              + vehcial.model + ' '
              + vehcial.modelYear.toString(),
            value: vehcial.id
          });

          // this.form.get('registrationPlate').setValue(vehcial.registrationPlate);

        }
      );
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }
    this.model = this.form.value;
    this.model.id = this.tripId;
    this.tripService.handoverTrip(this.model)
      .subscribe((response: ResponseModel<string>) => {
        if (response.hasError) {
          this.alertService.setErrorAlert(response.msg);
          return;
        }
        this.tripService.setTripHandoverPopup(false);
      });
  }

  close(): void {
    this.tripService.setTripHandoverPopup(false);
  }


}
