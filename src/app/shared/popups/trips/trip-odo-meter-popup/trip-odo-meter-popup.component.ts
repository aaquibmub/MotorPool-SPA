import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { TripOdoMeterModel } from 'src/app/helper/models/trips/trip-odo-meter-model';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { TripService } from 'src/app/helper/services/trips/trip.service';

@Component({
  selector: 'app-trip-odo-meter-popup',
  templateUrl: './trip-odo-meter-popup.component.html',
  styleUrls: ['./trip-odo-meter-popup.component.css']
})
export class TripOdoMeterPopupComponent implements OnInit {
  @Input() tripId: string;
  form: UntypedFormGroup;
  model: TripOdoMeterModel;

  constructor(
    public utilityService: UtilityService,
    private tripService: TripService,
    private dialogService: DialogService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.tripService.getTripOdoMeterModel(this.tripId)
      .subscribe(
        (model: TripOdoMeterModel) => {
          this.model = model;

          this.initForm();
        }
      );
  }

  private initForm(): void {

    this.form = new UntypedFormGroup({
      start: new UntypedFormControl(this.model.start),
      end: new UntypedFormControl(this.model.end),
      backToMotorpool: new UntypedFormControl(this.model.backToMotorpool)
    });
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }
    const primaryAction = 'Update';
    const successAction = 'Updated';
    const primaryMsg = 'Do you want to ' + primaryAction + ' this trip?';

    const dialog: DialogRef = this.dialogService
      .open(this.alertService.getConfirmDialougeConfig(
        'Confirm ' + primaryAction, primaryMsg, primaryAction));

    dialog.result.subscribe((result: any) => {
      if (result.text === primaryAction) {
        this.model = this.form.value;
        this.model.tripId = this.tripId;
        this.tripService.updateOdoMeterTrip(this.model)
          .subscribe((response: ResponseModel<string>) => {
            if (response.hasError) {
              this.alertService.setErrorAlert(response.msg);
              return;
            }
            this.tripService.setTripOdoMeterPopup(false);
          });
      }
    });
  }

  close(): void {
    this.tripService.setTripOdoMeterPopup(false);
  }


}
