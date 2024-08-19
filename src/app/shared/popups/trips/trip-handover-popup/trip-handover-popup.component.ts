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
  vehicalList: VehicalModel[];

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
    this.vehicalList = [];
    this.form.get('newVehical').setValue(null);
    if (!value) {
      return;
    }

    this.vehicalService.getVehicalByDriverId(value.value)
      .subscribe(
        (response: ResponseModel<VehicalModel[]>) => {
          if (response.hasError) {
            return;
          }

          const vList = [];
          response.result?.forEach(v => {
            vList.push({
              text: v.make + ' '
                + v.model + ' '
                + v.modelYear.toString(),
              value: v.id,
              textEx: v.registrationPlate
            });
          });

          this.vehicalList = vList;
          const vehcial = response.result[0];
          let vehicleVal = null;
          if (vehcial) {
            vehicleVal = {
              text: vehcial.make + ' '
                + vehcial.model + ' '
                + vehcial.modelYear.toString(),
              value: vehcial.id,
              textEx: vehcial.registrationPlate
            };
            this.form.get('newVehical').setValue(vehicleVal);
          }
          this.handlVehicleValueChange(vehicleVal);

          // this.form.get('registrationPlate').setValue(vehcial.registrationPlate);

        }
      );
  }

  handlVehicleValueChange(value: DropdownItem<string>): void {
    let regPlateNumber = null;
    if (value) {
      regPlateNumber = value.textEx;
    }
    this.form.get('registrationPlate').setValue(regPlateNumber);
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
