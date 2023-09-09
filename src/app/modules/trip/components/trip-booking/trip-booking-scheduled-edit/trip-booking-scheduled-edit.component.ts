import { CommonService } from './../../../../../helper/services/common/common.service';
import { ApproverService } from './../../../../../helper/services/trips/approver.service';
import { ResponseModel } from './../../../../../helper/models/common/response-model';
import { UtilityRix } from './../../../../../helper/common/utility-rix';
import { PassengerService } from './../../../../../helper/services/trips/passenger.service';
import { TripBookingService } from './../../../../../helper/services/trips/trip-booking.service';
import { UtilityService } from './../../../../../helper/services/common/utility.service';
import { AlertService } from './../../../../../helper/services/common/alert.service';
import { OverlayService } from './../../../../../helper/services/common/overlay.service';
import { NotificationService } from './../../../../../helper/services/common/notification.service';
import { PassengerModel } from './../../../../../helper/models/passengers/passenger-model';
import { DropdownItem } from '../../../../../helper/models/common/dropdown/dropdown-item.model';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TripBookingScheduledModel } from './../../../../../helper/models/trips/trip-bookings/trip-booking-scheduled-model';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DropdownType, Gender, TripDestination, TripRoute } from 'src/app/helper/common/shared-types';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { AgeGroupService } from 'src/app/helper/services/utilities/age-group.service';

@Component({
  selector: 'app-trip-booking-scheduled-edit',
  templateUrl: './trip-booking-scheduled-edit.component.html',
  styleUrls: ['./trip-booking-scheduled-edit.component.css']
})
export class TripBookingScheduledEditComponent implements OnInit {

  editMode = false;
  model: TripBookingScheduledModel;
  form: UntypedFormGroup;

  approverList: DropdownItem<string>[];

  requesterList: DropdownItem<string>[];
  requesterDetail: PassengerModel;
  genderList: DropdownItem<number>[];
  ageGroupList: DropdownItem<string>[];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private notificationService: NotificationService,
    private overlayService: OverlayService,
    private dialogService: DialogService,
    public utilityService: UtilityService,
    private commonService: CommonService,
    private tripBookingService: TripBookingService,
    private approverService: ApproverService,
    private ageGroupService: AgeGroupService,
    private passengerService: PassengerService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.route.params
      .subscribe((params: Params) => {
        if (params.id != null) {
          this.tripBookingService.getScheduledBooking(params.id)
            .subscribe((model: TripBookingScheduledModel) => {
              this.model = model;
              this.editMode = true;
              this.initForm();
            });
        } else {

          this.tripBookingService.getDefaultScheduledBookingModel()
            .subscribe(
              (model: TripBookingScheduledModel) => {
                this.model = model;

                this.initForm();
              }
            );

        }
      });

    this.commonService.getDropdownList(DropdownType.Gender, '')
      .subscribe((list: DropdownItem<number>[]) => {
        this.genderList = list;
      });

    this.approverService.getDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.approverList = list;
      });

    this.passengerService.getDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.requesterList = list;
      });

    this.ageGroupService.getDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.ageGroupList = list;
      });

    // this.passengerService.getSelectedPassengerModel().subscribe(
    //   (requester: DropdownItem<string>) => {
    //     if (requester) {
    //       this.passengerService.getDropdownList('')
    //         .subscribe((list: DropdownItem<string>[]) => {
    //           this.requesterList = list;

    //           this.form.get('requester').setValue({
    //             value: requester.value,
    //             text: requester.text
    //           });
    //         });
    //     }
    //   }
    // );

  }

  private initForm(): void {

    let bookedBy: DropdownItem<string> = null;
    let approvedBy: DropdownItem<string> = null;
    let requester: DropdownItem<string> = null;
    let requesterGender: DropdownItem<Gender> = null;
    let requesterAddress: DropdownItem<string> = null;
    let isRequesterTraveling = false;
    let passengers: UntypedFormGroup[] = [];

    let isSpecialServicesRequired = false;
    let specialSevices: UntypedFormGroup[] = [];

    let startDate = null;
    let endDate = null;

    let pickupTime = null;

    let tripRoute: DropdownItem<TripRoute> = null;
    let tripDestination: DropdownItem<TripDestination> = null;

    let startingPoint: DropdownItem<string> = null;
    let pickupAddress: DropdownItem<string> = null;
    let stops: UntypedFormGroup[] = [];
    let dropoffAddress: DropdownItem<string> = null;

    let driver: DropdownItem<string> = null;
    let vehical: DropdownItem<string> = null;

    let notes: string = '';

    if (this.model) {
      bookedBy = this.model.bookedBy;
      approvedBy = this.model.approvedBy;

      requester = this.model.requester;
      requesterGender = this.model.requesterGender;
      requesterAddress = this.model.requesterAddress;
      isRequesterTraveling = this.model.isRequesterTraveling;

      if (this.model.passengers && this.model.passengers.length > 0) {
        this.model.passengers.forEach(f => {
          passengers.push(this.tripBookingService.createPassengerFormGroup(f));
        });
      }

      isSpecialServicesRequired = this.model.isSpecialServicesRequired;

      if (this.model.specialSevices && this.model.specialSevices.length > 0) {
        this.model.specialSevices.forEach(f => {
          specialSevices.push(this.tripBookingService.createSpecialServiceFormGroup(f));
        });
      }

      startDate = this.model.startDate;
      endDate = this.model.endDate;
      pickupTime = this.model.pickupTime;

      tripRoute = this.model.tripRoute;
      tripDestination = this.model.tripDestination;

      startingPoint = this.model.startingPoint;
      pickupAddress = this.model.pickupAddress;

      if (this.model.stops && this.model.stops.length > 0) {
        this.model.stops.forEach(f => {
          stops.push(this.tripBookingService.createStopFormGroup(f));
        });
      }

      dropoffAddress = this.model.dropoffAddress;

      driver = this.model.driver;
      vehical = this.model.vehical;
      notes = this.model.notes;

      this.form = new UntypedFormGroup({
        bookedBy: new UntypedFormControl(
          bookedBy, [UtilityRix.dropdownRequired as ValidatorFn]),
        approvedBy: new UntypedFormControl(
          approvedBy, [UtilityRix.dropdownRequired as ValidatorFn]),
        requester: new UntypedFormControl(
          requester, [UtilityRix.dropdownRequired as ValidatorFn]),
        requesterGender: new UntypedFormControl(
          requesterGender, [UtilityRix.dropdownRequired as ValidatorFn]),
        requesterAddress: new UntypedFormControl(
          requesterAddress, [UtilityRix.dropdownRequired as ValidatorFn]),
        isRequesterTraveling: new UntypedFormControl(isRequesterTraveling),
        passengers: new UntypedFormArray(passengers),

        isSpecialServicesRequired: new UntypedFormControl(isSpecialServicesRequired),
        specialSevices: new UntypedFormArray(specialSevices),

        startDate: new UntypedFormControl(startDate ? new Date(startDate) : null, [Validators.required]),
        endDate: new UntypedFormControl(endDate ? new Date(endDate) : null, [Validators.required]),
        pickupTime: new UntypedFormControl(pickupTime ? new Date(pickupTime) : null, [Validators.required]),

        tripRoute: new UntypedFormControl(
          tripRoute, [UtilityRix.dropdownRequired as ValidatorFn]),
        tripDestination: new UntypedFormControl(
          tripDestination, [UtilityRix.dropdownRequired as ValidatorFn]),
        startingPoint: new UntypedFormControl(startingPoint),
        pickupAddress: new UntypedFormControl(pickupAddress),
        stops: new UntypedFormArray(stops),
        dropoffAddress: new UntypedFormControl(dropoffAddress),
        driver: new UntypedFormControl(driver),
        vehical: new UntypedFormControl(vehical),
        notes: new UntypedFormControl(notes)
      });
    }

  }

  cancel(): void {
    this.router.navigate(['/trips/bookings/scheduled']);
  }

  submit(): void {
    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    const formValue = this.form.value as TripBookingScheduledModel;

    const primaryAction = 'Create';
    const successAction = 'Created';
    const primaryMsg = 'Do you want to create booking?';

    const dialog: DialogRef = this.dialogService
      .open(this.alertService.getConfirmDialougeConfig(
        'Confirm ' + primaryAction, primaryMsg, primaryAction));

    dialog.result.subscribe((result: any) => {
      if (result.text === primaryAction) {
        this.tripBookingService.addUpdateScheduled(
          this.tripBookingService.prepareSaveTripBookingScheduled(
            this.model?.id ?? '',
            formValue))
          .subscribe(
            (response: ResponseModel<string>) => {
              if (response.hasError) {
                this.alertService.setErrorAlert(response.msg);
                return;
              }

              this.alertService.setSuccessAlert(
                'Trip booking is '
                + successAction
                + ' successfully');

              this.utilityService.redirectToUrl('/trips');

            }
          );
      }
    });
  }


  handleApproverFilter(text: string): void {
    this.approverService.getDropdownList(text)
      .subscribe((list: DropdownItem<string>[]) => {
        this.approverList = list;
      });
  }

  handlePassengerFilter(text: string): void {
    this.passengerService.getDropdownList(text)
      .subscribe((list: DropdownItem<string>[]) => {
        this.requesterList = list;
      });
  }

  handlePassengerValueChange(value: DropdownItem<string>): void {
    if (value == null || value.value === '') {
      this.requesterDetail = null;
    }
    this.passengerService.get(value.value)
      .subscribe((requester: PassengerModel) => {
        this.requesterDetail = requester;
      });
  }

  openPassengerQuickAddPopup(flag: boolean): void {
    // this.passengerService.setPassengerQuickAddPopup(true);
  }

  handleNumberOfPassengerChange(control: any): void {
    const value = +control.srcElement.value;
    var passengersFormArray = (this.form?.get('passengers') as UntypedFormArray);
    passengersFormArray.clear();
    let count = 0;
    while (value > count) {
      passengersFormArray.push(this.tripBookingService.createPassengerFormGroup(null));
      count++;
    }
  }
}
