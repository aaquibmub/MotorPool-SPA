import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
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
  vehicalList: DropdownItem<string>[];

  constructor(
    public utilityService: UtilityService,
    private tripService: TripService,
    private driverService: DriverService,
    private vehicalService: VehicalService,
    private dialogService: DialogService,
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

    if (this.model.driver) {
      this.handleDriverValueChange(this.model.driver);
    }

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
            this.form.get('vehical').setValue(vehicleVal);
          }
          this.handlVehicleValueChange(vehicleVal);

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
    const primaryAction = 'Assign';
    const successAction = 'Assigned';
    const primaryMsg = 'Do you want to ' + primaryAction + ' this trip?';

    const dialog: DialogRef = this.dialogService
      .open(this.alertService.getConfirmDialougeConfig(
        'Confirm ' + primaryAction, primaryMsg, primaryAction));

    dialog.result.subscribe((result: any) => {
      if (result.text === primaryAction) {
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
    });
  }

  close(): void {
    this.tripService.setTripExecutePopup(false);
  }


}
