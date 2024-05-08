import { Component, ElementRef, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { TripInformationModel } from 'src/app/helper/models/trips/trip-edit/trip-information-model';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { SignalRService } from 'src/app/helper/services/common/signal-r.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { TripService } from 'src/app/helper/services/trips/trip.service';

@Component({
  selector: 'app-trip-edit-info',
  templateUrl: './trip-edit-info.component.html',
  styleUrls: ['./trip-edit-info.component.css']
})
export class TripEditInfoComponent implements OnInit {

  model: TripInformationModel;
  form: UntypedFormGroup;

  constructor(
    private el: ElementRef,
    public utilityService: UtilityService,
    private tripService: TripService,
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
    private signalRService: SignalRService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.parent.params
      .subscribe((params: Params) => {
        if (params.id) {
          this.tripService.getTripInformationModel(params.id)
            .subscribe((model: TripInformationModel) => {
              this.model = model;
              this.initForm();
            })
        }
      });
  }

  private initForm(): void {

    let pickupDate = null;
    let pickupTime = null;

    let notes: string = '';

    if (this.model) {

      pickupDate = this.model.pickupDate;
      pickupTime = this.model.pickupTime;
      notes = this.model.notes;

      this.form = new UntypedFormGroup({
        tripId: new UntypedFormControl(this.model.tripId),
        pickupDate: new UntypedFormControl(pickupDate ? new Date(pickupDate) : new Date(), [Validators.required]),
        pickupTime: new UntypedFormControl(pickupTime ? new Date(pickupTime) : new Date(), [Validators.required]),
        notes: new UntypedFormControl(notes)
      });
    }

  }

  submit(): void {

    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    const formValue = this.form.value as TripInformationModel;

    const primaryAction = 'Save';
    const successAction = 'Saved';
    const primaryMsg = 'Do you want to save trip information?';

    const dialog: DialogRef = this.dialogService
      .open(this.alertService.getConfirmDialougeConfig(
        'Confirm ' + primaryAction, primaryMsg, primaryAction));

    dialog.result.subscribe((result: any) => {
      if (result.text === primaryAction) {
        this.tripService.updateTripInformation(formValue)
          .subscribe(
            (response: ResponseModel<string>) => {
              debugger
              if (response.hasError) {
                this.alertService.setErrorAlert(response.msg);
                return;
              }

              this.signalRService.updateNotificationList();

              this.alertService.setSuccessAlert(
                'Trip information is '
                + successAction
                + ' successfully');

            }
          );
      }
    });
  }

}
