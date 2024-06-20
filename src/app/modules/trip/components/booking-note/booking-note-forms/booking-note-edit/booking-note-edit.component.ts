import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { TripBookingNoteModel } from 'src/app/helper/models/trips/trip-bookings/booking-note/trip-booking-note-model';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { CommonService } from 'src/app/helper/services/common/common.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { TripBookingService } from 'src/app/helper/services/trips/trip-booking.service';

@Component({
  selector: 'app-booking-note-edit',
  templateUrl: './booking-note-edit.component.html',
  styleUrls: ['./booking-note-edit.component.css']
})
export class BookingNoteEditComponent implements OnInit {
  id: string;
  editMode = false;
  model: TripBookingNoteModel;
  form: UntypedFormGroup;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    public utilityService: UtilityService,
    private commonService: CommonService,
    private tripBookingService: TripBookingService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.route.params
      .subscribe((params: Params) => {
        if (params.id != null) {
          this.id = params.id;
          this.tripBookingService.getBookingNote(params.id)
            .subscribe((model: TripBookingNoteModel) => {
              this.model = model;
              this.editMode = true;
              this.initForm();
            });
        } else {
          this.initForm();
        }
      });

  }

  private initForm(): void {

    let name: string = null;
    let status: boolean = false;

    if (this.model) {
      name = this.model.name;
      status = this.model.status;
    }

    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(
        name, [Validators.required]),
      status: new UntypedFormControl(
        status, [Validators.required]),
    });

  }

  cancel(): void {
    this.router.navigate(['/trips/booking-note-list/all/']);
  }

  submit(): void {
    if (!this.form.valid) {
      debugger;
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    const formValue = this.form.value as TripBookingNoteModel;
    formValue.id = this.id;
    const primaryAction = this.editMode ? 'Update' : 'Create';
    const successAction = this.editMode ? 'Updated' : 'Created';
    const primaryMsg = 'Do you want to ' + primaryAction + ' note?';

    const dialog: DialogRef = this.dialogService
      .open(this.alertService.getConfirmDialougeConfig(
        'Confirm ' + primaryAction, primaryMsg, primaryAction));

    dialog.result.subscribe((result: any) => {
      if (result.text === primaryAction) {
        this.tripBookingService.addUpdateBookingNote(formValue)
          .subscribe(
            (response: ResponseModel<string>) => {

              if (response.hasError) {
                this.alertService.setErrorAlert(response.msg);
                return;
              }

              this.alertService.setSuccessAlert(
                'TripBookingNote is '
                + successAction
                + ' successfully');

              this.utilityService.redirectToUrl('/trips/booking-note-list/all');

            }
          );
      }
    });
  }

}
