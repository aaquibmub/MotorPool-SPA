import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormArray, UntypedFormArray, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { guid } from '@progress/kendo-angular-common';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Subscription } from 'rxjs';
import { DropdownType } from 'src/app/helper/common/shared-types';
import { PopupConfigModel } from 'src/app/helper/models/common/popup-config-model';
import { VehicalModel } from 'src/app/helper/models/vehicals/vehical-model';
import { TripService } from 'src/app/helper/services/trips/trip.service';
import { DestinationType, TripDestination, TripRoute } from './../../../../../helper/common/shared-types';
import { UtilityRix } from './../../../../../helper/common/utility-rix';
import { DropdownItem } from './../../../../../helper/models/common/dropdown/dropdown-item.model';
import { ResponseModel } from './../../../../../helper/models/common/response-model';
import { TripBookingRefuelingModel } from './../../../../../helper/models/trips/trip-bookings/trip-booking-refueling-model';
import { AddressService } from './../../../../../helper/services/address/address.service';
import { AlertService } from './../../../../../helper/services/common/alert.service';
import { CommonService } from './../../../../../helper/services/common/common.service';
import { OverlayService } from './../../../../../helper/services/common/overlay.service';
import { SignalRService } from './../../../../../helper/services/common/signal-r.service';
import { UtilityService } from './../../../../../helper/services/common/utility.service';
import { DriverService } from './../../../../../helper/services/drivers/driver.service';
import { ApproverService } from './../../../../../helper/services/trips/approver.service';
import { TripBookingService } from './../../../../../helper/services/trips/trip-booking.service';
import { VehicalService } from './../../../../../helper/services/vehicals/vehical.service';

@Component({
  selector: 'app-trip-booking-refuelling-edit',
  templateUrl: './trip-booking-refuelling-edit.component.html',
  styleUrls: ['./trip-booking-refuelling-edit.component.css']
})
export class TripBookingRefuellingEditComponent implements OnInit, OnDestroy {

  editMode = false;
  model: TripBookingRefuelingModel;
  form: UntypedFormGroup;

  approverList: DropdownItem<string>[];

  tripTypeList: DropdownItem<number>[];
  tripDestinationList: DropdownItem<number>[];

  addressList: DropdownItem<string>[];

  driverList: DropdownItem<string>[];
  vehicalList: VehicalModel[];

  tripExecutePopupSubscription: Subscription;


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
    private tripService: TripService,
    private approverService: ApproverService,
    private addressService: AddressService,
    private driverService: DriverService,
    private vehicalService: VehicalService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.tripExecutePopupSubscription = this.tripService.getTripExecutePopup()
      .subscribe(
        (config: PopupConfigModel) => {
          if (!config.show) {
            this.utilityService.redirectToUrl('/trips');
          }
        }
      );

    this.route.params
      .subscribe((params: Params) => {
        if (params.id != null) {
          this.tripBookingService.getRefuelingBooking(params.id)
            .subscribe((model: TripBookingRefuelingModel) => {
              this.model = model;
              this.editMode = true;
              this.initForm();
            });
        } else {

          this.tripBookingService.getDefaultRefuelingBookingModel()
            .subscribe(
              (model: TripBookingRefuelingModel) => {
                this.model = model;

                this.initForm();
              }
            );

        }
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

    this.addressService.getDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.addressList = list;
      });

    this.driverService.getDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.driverList = list;
      });

    // this.vehicalService.getDropdownList('')
    //   .subscribe((list: DropdownItem<string>[]) => {
    //     this.vehicalList = list;
    //   });

  }

  private initForm(): void {

    let bookedBy: DropdownItem<string> = null;
    let approvedBy: DropdownItem<string> = null;

    let pickupDate = null;
    let pickupTime = null;

    let tripRoute: DropdownItem<TripRoute> = null;
    let tripDestination: DropdownItem<TripDestination> = null;

    let startingPoint: DropdownItem<string> = null;
    let destinations: UntypedFormGroup[] = [
      this.tripBookingService.createDestinationFormGroup({
        id: guid(),
        sequence: 0,
        type: { value: DestinationType.Address, text: 'Address' },
        address: null
      }),
    ];

    let driver: DropdownItem<string> = null;
    let vehical: DropdownItem<string> = null;
    let registrationPlate = '';

    let notes: string = '';

    if (this.model) {
      bookedBy = this.model.bookedBy;
      approvedBy = this.model.approvedBy;

      pickupDate = this.model.pickupDate;
      pickupTime = this.model.pickupTime;

      tripRoute = this.model.tripRoute;
      tripDestination = this.model.tripDestination;

      startingPoint = this.model.startingPoint;

      if (this.model.destinations && this.model.destinations.length > 0) {
        this.model.destinations.forEach(f => {
          destinations.push(this.tripBookingService.createDestinationFormGroup(f));
        });
      }

      driver = this.model.driver;
      vehical = this.model.vehical;
      registrationPlate = this.model.registrationPlate;
      notes = this.model.notes;

      this.form = new UntypedFormGroup({
        bookedBy: new UntypedFormControl(
          bookedBy, [UtilityRix.dropdownRequired as ValidatorFn]),
        approvedBy: new UntypedFormControl(
          approvedBy, [UtilityRix.dropdownRequired as ValidatorFn]),

        pickupDate: new UntypedFormControl(
          pickupDate ? new Date(pickupDate) : new Date(), [Validators.required]),
        pickupTime: new UntypedFormControl(
          pickupTime ? new Date(pickupTime) : new Date(), [Validators.required]),

        tripRoute: new UntypedFormControl(
          tripRoute, [UtilityRix.dropdownRequired as ValidatorFn]),
        tripDestination: new UntypedFormControl(
          tripDestination, [UtilityRix.dropdownRequired as ValidatorFn]),
        startingPoint: new UntypedFormControl(startingPoint),

        destinations: new UntypedFormArray(destinations),

        driver: new UntypedFormControl(driver),
        vehical: new UntypedFormControl(vehical),
        registrationPlate: new UntypedFormControl(registrationPlate),
        notes: new UntypedFormControl(notes)
      });
    }

  }

  cancel(): void {
    this.router.navigate(['/trips/bookings/refueling']);
  }

  submit(execute?: boolean): void {

    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    const formValue = this.form.value as TripBookingRefuelingModel;

    const primaryAction = 'Create';
    const successAction = 'Created';
    const primaryMsg = 'Do you want to create booking?';

    const dialog: DialogRef = this.dialogService
      .open(this.alertService.getConfirmDialougeConfig(
        'Confirm ' + primaryAction, primaryMsg, primaryAction));

    dialog.result.subscribe((result: any) => {
      if (result.text === primaryAction) {
        this.tripBookingService.addUpdateRefueling(
          this.tripBookingService.prepareSaveTripBookingRefueling(
            this.model?.id ?? '',
            formValue))
          .subscribe(
            (response: ResponseModel<string>) => {
              debugger
              if (response.hasError) {
                this.alertService.setErrorAlert(response.msg);
                return;
              }

              this.signalRService.updateNotificationList();


              if (execute) {
                this.tripService.setTripExecutePopup(true, response.result);
              } else {

                this.alertService.setSuccessAlert(
                  'Trip booking is '
                  + successAction
                  + ' successfully');

                this.utilityService.redirectToUrl('/trips');
              }

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

  removeDestination(index: number): void {

    const destinationsFormArray = (this.form?.get('destinations') as FormArray);
    let address = 0;
    destinationsFormArray.controls.forEach(f => {
      const type = f.get('type').value;
      if (type == DestinationType.Address) {
        address++;
      }
    });

    const destination = (this.form?.get('destinations') as FormArray).controls[index];
    if (destination) {

      const destinationType = destination.get('type').value as DropdownItem<DestinationType>;
      if (destinationType.value == DestinationType.Address && address <= 1) {
        this.alertService.setErrorAlert('There should b one address')
        return;
      }

      (this.form?.get('destinations') as FormArray).removeAt(index);
    }
  }

  handleAddressFilter(text: string): void {
    this.addressService.getDropdownList(text)
      .subscribe((list: DropdownItem<string>[]) => {
        this.addressList = list;
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

  ngOnDestroy(): void {
    if (this.tripExecutePopupSubscription) {
      this.tripExecutePopupSubscription.unsubscribe();
    }
  }
}
