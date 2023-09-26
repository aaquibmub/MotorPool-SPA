import { ResponseModel } from './../../../../../helper/models/common/response-model';
import { UtilityRix } from './../../../../../helper/common/utility-rix';
import { Gender, TripDestination, TripRoute } from './../../../../../helper/common/shared-types';
import { AlertService } from './../../../../../helper/services/common/alert.service';
import { VehicalService } from './../../../../../helper/services/vehicals/vehical.service';
import { DriverService } from './../../../../../helper/services/drivers/driver.service';
import { AddressService } from './../../../../../helper/services/utilities/address.service';
import { PassengerService } from './../../../../../helper/services/trips/passenger.service';
import { AgeGroupService } from './../../../../../helper/services/utilities/age-group.service';
import { ApproverService } from './../../../../../helper/services/trips/approver.service';
import { TripBookingService } from './../../../../../helper/services/trips/trip-booking.service';
import { CommonService } from './../../../../../helper/services/common/common.service';
import { UtilityService } from './../../../../../helper/services/common/utility.service';
import { SignalRService } from './../../../../../helper/services/common/signal-r.service';
import { OverlayService } from './../../../../../helper/services/common/overlay.service';
import { PassengerModel } from './../../../../../helper/models/passengers/passenger-model';
import { DropdownItem } from './../../../../../helper/models/common/dropdown/dropdown-item.model';
import { TripBookingStartNowModel } from './../../../../../helper/models/trips/trip-bookings/trip-booking-start-now-model';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DropdownType } from 'src/app/helper/common/shared-types';

@Component({
  selector: 'app-trip-booking-start-now-edit',
  templateUrl: './trip-booking-start-now-edit.component.html',
  styleUrls: ['./trip-booking-start-now-edit.component.css']
})
export class TripBookingStartNowEditComponent implements OnInit {

  editMode = false;
  model: TripBookingStartNowModel;
  form: UntypedFormGroup;

  approverList: DropdownItem<string>[];

  requesterList: DropdownItem<string>[];
  requesterDetail: PassengerModel;
  passengerDetail: PassengerModel[];
  genderList: DropdownItem<number>[];
  ageGroupList: DropdownItem<string>[];

  tripTypeList: DropdownItem<number>[];
  tripDestinationList: DropdownItem<number>[];

  addressList: DropdownItem<string>[];

  driverList: DropdownItem<string>[];
  vehicalList: DropdownItem<string>[];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private notificationService: NotificationService,
    private overlayService: OverlayService,
    private signalRService: SignalRService,
    private dialogService: DialogService,
    public utilityService: UtilityService,
    private commonService: CommonService,
    private tripBookingService: TripBookingService,
    private approverService: ApproverService,
    private ageGroupService: AgeGroupService,
    private passengerService: PassengerService,
    private addressService: AddressService,
    private driverService: DriverService,
    private vehicalService: VehicalService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.route.params
      .subscribe((params: Params) => {
        if (params.id != null) {
          this.tripBookingService.getStartNowBooking(params.id)
            .subscribe((model: TripBookingStartNowModel) => {
              this.model = model;
              this.editMode = true;
              this.initForm();
            });
        } else {

          this.tripBookingService.getDefaultStartNowBookingModel()
            .subscribe(
              (model: TripBookingStartNowModel) => {
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

    this.commonService.getDropdownList(DropdownType.TripRoute, '')
      .subscribe((list: DropdownItem<number>[]) => {
        this.tripTypeList = list;
      });

    this.commonService.getDropdownList(DropdownType.TripDestination, '')
      .subscribe((list: DropdownItem<number>[]) => {
        this.tripDestinationList = list;
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

    this.passengerService.getSelectedModel().subscribe(
      (requester: PassengerModel) => {
        if (requester) {
          this.passengerService.getDropdownList('')
            .subscribe((list: DropdownItem<string>[]) => {
              this.requesterList = list;

              this.form.get('requester').setValue({
                value: requester.id,
                text: requester.name
              });
            });
        }
      }
    );

    this.addressService.getDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.addressList = list;
      });

    this.driverService.getDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.driverList = list;
      });

    this.vehicalService.getDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.vehicalList = list;
      });

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

    let pickupDate = null;
    let pickupTime = null;

    let tripRoute: DropdownItem<TripRoute> = null;
    let tripDestination: DropdownItem<TripDestination> = null;

    let startingPoint: DropdownItem<string> = null;

    let pickups: UntypedFormGroup[] = [
      this.tripBookingService.createPickupFormGroup(null)
    ];
    let stops: UntypedFormGroup[] = [];
    let dropoffs: UntypedFormGroup[] = [
      this.tripBookingService.createDropoffFormGroup(null)
    ];

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

      pickupDate = this.model.pickupDate;
      pickupTime = this.model.pickupTime;

      tripRoute = this.model.tripRoute;
      tripDestination = this.model.tripDestination;

      startingPoint = this.model.startingPoint;

      if (this.model.pickups && this.model.pickups.length > 0) {
        this.model.pickups.forEach(f => {
          pickups.push(this.tripBookingService.createPickupFormGroup(f));
        });
      }

      if (this.model.stops && this.model.stops.length > 0) {
        this.model.stops.forEach(f => {
          stops.push(this.tripBookingService.createStopFormGroup(f));
        });
      }

      if (this.model.dropoffs && this.model.dropoffs.length > 0) {
        this.model.dropoffs.forEach(f => {
          dropoffs.push(this.tripBookingService.createDropoffFormGroup(f));
        });
      }

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
        requesterGender: new UntypedFormControl(requesterGender),
        requesterAddress: new UntypedFormControl(requesterAddress),
        isRequesterTraveling: new UntypedFormControl(isRequesterTraveling),
        passengers: new UntypedFormArray(passengers),

        isSpecialServicesRequired: new UntypedFormControl(isSpecialServicesRequired),
        specialSevices: new UntypedFormArray(specialSevices),

        pickupDate: new UntypedFormControl(
          pickupDate ? new Date(pickupDate) : new Date(), [Validators.required]),
        pickupTime: new UntypedFormControl(
          pickupTime ? new Date(pickupTime) : new Date(), [Validators.required]),

        tripRoute: new UntypedFormControl(
          tripRoute, [UtilityRix.dropdownRequired as ValidatorFn]),
        tripDestination: new UntypedFormControl(
          tripDestination, [UtilityRix.dropdownRequired as ValidatorFn]),
        startingPoint: new UntypedFormControl(startingPoint),
        pickups: new UntypedFormArray(pickups),
        stops: new UntypedFormArray(stops),
        dropoffs: new UntypedFormArray(dropoffs),
        driver: new UntypedFormControl(driver),
        vehical: new UntypedFormControl(vehical),
        notes: new UntypedFormControl(notes)
      });
    }

  }

  cancel(): void {
    this.router.navigate(['/trips/bookings/start-now']);
  }

  submit(): void {

    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    const formValue = this.form.value as TripBookingStartNowModel;

    const primaryAction = 'Create';
    const successAction = 'Created';
    const primaryMsg = 'Do you want to create booking?';

    const dialog: DialogRef = this.dialogService
      .open(this.alertService.getConfirmDialougeConfig(
        'Confirm ' + primaryAction, primaryMsg, primaryAction));

    dialog.result.subscribe((result: any) => {
      if (result.text === primaryAction) {
        this.tripBookingService.addUpdateStartNow(
          this.tripBookingService.prepareSaveTripBookingStartNow(
            this.model?.id ?? '',
            formValue))
          .subscribe(
            (response: ResponseModel<string>) => {
              debugger
              if (response.hasError) {
                this.alertService.setErrorAlert(response.msg);
                return;
              }

              this.alertService.setSuccessAlert(
                'Trip booking is '
                + successAction
                + ' successfully');

              this.signalRService.updateNotificationList();

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

  handleRequesterValueChange(value: DropdownItem<string>): void {
    if (value == null || value.value === '') {
      this.requesterDetail = null;
    }
    this.passengerService.get(value.value)
      .subscribe((requester: PassengerModel) => {
        this.requesterDetail = requester;
      });
  }

  handlePassengerValueChange(value: DropdownItem<string>, index: number): void {
    var passengerFormArray = this.form.get('passengers') as UntypedFormArray;
    if (value == null || value.value === '') {
      passengerFormArray.controls[index].setValue(
        this.tripBookingService.createPassengerFormGroup(null)
      );
    }

    this.passengerService.get(value.value)
      .subscribe((requester: PassengerModel) => {
        passengerFormArray.controls[index].get('gender').setValue(requester.gender);
        passengerFormArray.controls[index].get('ageGroup').setValue(requester.ageGroup);
      });
  }

  openPassengerQuickAddPopup(flag: boolean): void {
    this.passengerService.setQuickAddPopup(true);
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

  addNewPickup(): void {
    var pickupFormArray = this.form.get('pickups') as UntypedFormArray;
    pickupFormArray.push(this.tripBookingService.createPickupFormGroup(null));
  }

  removePickup(index: number): void {
    const len = (this.form?.get('pickups') as UntypedFormArray).controls.length;

    if (len <= 1) {
      this.alertService.setErrorAlert('There should b one pickup')
      return;
    }

    const pickup = (this.form?.get('pickups') as UntypedFormArray).controls[index];
    if (pickup) {
      (this.form?.get('pickups') as UntypedFormArray).removeAt(index);
    }
  }

  addNewStop(): void {
    var stopFormArray = this.form.get('stops') as UntypedFormArray;
    stopFormArray.push(this.tripBookingService.createStopFormGroup(null));
  }

  removeStop(index: number): void {

    const stop = (this.form?.get('stops') as UntypedFormArray).controls[index];
    if (stop) {
      (this.form?.get('stops') as UntypedFormArray).removeAt(index);
    }
  }

  addNewDropoff(): void {
    var dropoffFormArray = this.form.get('dropoffs') as UntypedFormArray;
    dropoffFormArray.push(this.tripBookingService.createDropoffFormGroup(null));
  }

  removeDropoff(index: number): void {
    const len = (this.form?.get('dropoffs') as UntypedFormArray).controls.length;

    if (len <= 1) {
      this.alertService.setErrorAlert('There should b one dropoff')
      return;
    }

    const dropoff = (this.form?.get('dropoffs') as UntypedFormArray).controls[index];
    if (dropoff) {
      (this.form?.get('dropoffs') as UntypedFormArray).removeAt(index);
    }
  }

  handleAddressFilter(text: string): void {
    this.addressService.getDropdownList(text)
      .subscribe((list: DropdownItem<string>[]) => {
        this.addressList = list;
      });
  }

}
