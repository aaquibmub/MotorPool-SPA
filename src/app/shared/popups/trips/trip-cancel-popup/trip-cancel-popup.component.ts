import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { TripStatusDetailModel } from 'src/app/helper/models/trips/enroute/trip-status-detail-model';
import { TripStatusModel } from 'src/app/helper/models/trips/enroute/trip-status-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { TripStatus } from './../../../../helper/common/shared-types';
import { ResponseModel } from './../../../../helper/models/common/response-model';
import { AlertService } from './../../../../helper/services/common/alert.service';
import { TripService } from './../../../../helper/services/trips/trip.service';

@Component({
  selector: 'app-trip-cancel-popup',
  templateUrl: './trip-cancel-popup.component.html',
  styleUrls: ['./trip-cancel-popup.component.css']
})
export class TripCancelPopupComponent implements OnInit {
  @Input() tripId: string;
  form: UntypedFormGroup;
  model: TripStatusDetailModel;

  constructor(
    public utilityService: UtilityService,
    private tripService: TripService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.tripService.getTripStatusDetailModel(this.tripId)
      .subscribe(
        (model: TripStatusDetailModel) => {
          this.model = model;

          this.initForm();
        }
      );
  }

  private initForm(): void {
    this.form = new UntypedFormGroup({
      remarks: new UntypedFormControl(null)
    });
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }
    var model = this.form.value as TripStatusModel;
    model.tripId = this.tripId;
    model.status = TripStatus.Cancelled as number;
    this.tripService.updateTripStatus(model)
      .subscribe((response: ResponseModel<string>) => {
        if (response.hasError) {
          this.alertService.setErrorAlert(response.msg);
          return;
        }
        this.tripService.setTripCancelPopup(false);
      });
  }

  close(): void {
    this.tripService.setTripCancelPopup(false);
  }


}
