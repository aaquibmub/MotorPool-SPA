import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { guid } from '@progress/kendo-angular-common';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { DestinationType, DropdownType, Gender, GetDestinationTypeForDropdownList, TripDestination, TripRoute } from 'src/app/helper/common/shared-types';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ActionButton } from 'src/app/helper/models/common/grid/action-button';
import { TripDestinationModel } from 'src/app/helper/models/trips/enroute/trip-destination-model';
import { VehicalModel } from 'src/app/helper/models/vehicals/vehical-model';
import { SignalRService } from 'src/app/helper/services/common/signal-r.service';
import { AgeGroupService } from 'src/app/helper/services/utilities/age-group.service';
import { UtilityRix } from './../../../../../helper/common/utility-rix';
import { ResponseModel } from './../../../../../helper/models/common/response-model';
import { PassengerModel } from './../../../../../helper/models/passengers/passenger-model';
import { TripBookingScheduledModel } from './../../../../../helper/models/trips/trip-bookings/trip-booking-scheduled-model';
import { AlertService } from './../../../../../helper/services/common/alert.service';
import { CommonService } from './../../../../../helper/services/common/common.service';
import { OverlayService } from './../../../../../helper/services/common/overlay.service';
import { UtilityService } from './../../../../../helper/services/common/utility.service';
import { DriverService } from './../../../../../helper/services/drivers/driver.service';
import { ApproverService } from './../../../../../helper/services/trips/approver.service';
import { PassengerService } from './../../../../../helper/services/trips/passenger.service';
import { TripBookingService } from './../../../../../helper/services/trips/trip-booking.service';
import { AddressService } from './../../../../../helper/services/utilities/address.service';
import { VehicalService } from './../../../../../helper/services/vehicals/vehical.service';

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
  passengerDetail: PassengerModel[];
  genderList: DropdownItem<number>[];
  ageGroupList: DropdownItem<string>[];

  tripTypeList: DropdownItem<number>[];
  selectedTripRoute: DropdownItem<number>;
  tripDestinationList: DropdownItem<number>[];

  addressList: DropdownItem<string>[];

  destinationButtons: ActionButton[][] = [];

  driverList: DropdownItem<string>[];
  vehicalList: DropdownItem<string>[];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
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

    let startDate = null;
    let endDate = null;

    let pickupTime = null;

    let schedulingDays = null;

    let tripRoute: DropdownItem<TripRoute> = null;
    let tripDestination: DropdownItem<TripDestination> = null;

    let startingPoint: DropdownItem<string> = null;
    let destinations: UntypedFormGroup[] = [];

    let driver: DropdownItem<string> = null;
    let vehical: DropdownItem<string> = null;
    let registrationPlate: string = '';

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

      schedulingDays = this.model.scheduledDays;

      startingPoint = this.model.startingPoint;

      if (this.model.destinations && this.model.destinations.length > 0) {
        let index = 0;
        // const destinationTypes = GetDestinationTypeForDropdownList();
        this.model.destinations.forEach(f => {
          // const type = destinationTypes.find(d => d.value == f.type.value);
          this.destinationButtons[index] = [
            {
              handle: () => {
                this.addNewDestination(index, DestinationType.Pickup);
              },
              icon: '',
              label: 'Add Pickup'
            },
            {
              handle: () => {
                this.addNewDestination(index, DestinationType.Stop);
              },
              icon: '',
              label: 'Add Stop'
            },
            {
              handle: () => {
                this.addNewDestination(index, DestinationType.Dropoff);
              },
              icon: '',
              label: 'Add Dropoff'
            }
          ]
          destinations.push(this.tripBookingService.createDestinationFormGroup(f));
          index++;
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
        requester: new UntypedFormControl(
          requester, [UtilityRix.dropdownRequired as ValidatorFn]),
        requesterGender: new UntypedFormControl(requesterGender),
        requesterAddress: new UntypedFormControl(requesterAddress),
        isRequesterTraveling: new UntypedFormControl(isRequesterTraveling),
        passengers: new UntypedFormArray(passengers),

        isSpecialServicesRequired: new UntypedFormControl(isSpecialServicesRequired),
        specialSevices: new UntypedFormArray(specialSevices),

        startDate: new UntypedFormControl(startDate ? new Date(startDate) : new Date(), [Validators.required]),
        endDate: new UntypedFormControl(endDate ? new Date(endDate) : new Date(), [Validators.required]),
        pickupTime: new UntypedFormControl(pickupTime ? new Date(pickupTime) : new Date(), [Validators.required]),
        scheduledDays: new UntypedFormGroup({
          sunday: new FormControl(schedulingDays ? schedulingDays.sunday : false),
          monday: new FormControl(schedulingDays ? schedulingDays.monday : false),
          tuesday: new FormControl(schedulingDays ? schedulingDays.tuesday : false),
          wednesday: new FormControl(schedulingDays ? schedulingDays.wednesday : false),
          thursday: new FormControl(schedulingDays ? schedulingDays.thursday : false),
          friday: new FormControl(schedulingDays ? schedulingDays.friday : false),
          saturday: new FormControl(schedulingDays ? schedulingDays.saturday : false),
        }),

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
    this.router.navigate(['/trips/bookings/scheduled']);
  }

  submit(): void {
    debugger;
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
    var passengerFormArray = this.form.get('passengers') as FormArray;
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

  handleTripTypeValueChange(value: DropdownItem<number>): void {
    this.selectedTripRoute = value;
    var destinations = [];
    if (value.value == (TripRoute.RoundTrip as number)) {
      destinations = [
        this.tripBookingService.createDestinationFormGroup({
          id: guid(),
          sequence: 0,
          type: { value: DestinationType.Pickup, text: 'Pickup' },
          address: null
        }),
        this.tripBookingService.createDestinationFormGroup({
          id: guid(),
          sequence: 1,
          type: { value: DestinationType.Address, text: 'Address' },
          address: null
        })
      ];


      let dIndex = 0;
      destinations.forEach(d => {
        this.destinationButtons[dIndex] = [
          {
            handle: (index) => {
              this.addNewDestination(index, DestinationType.Pickup);
            },
            icon: '',
            label: 'Add Pickup'
          },
          {
            handle: (index) => {
              this.addNewDestination(index, DestinationType.Stop);
            },
            icon: '',
            label: 'Add Stop'
          },
          {
            handle: (index) => {
              this.addNewDestination(index, DestinationType.Address);
            },
            icon: '',
            label: 'Add Address'
          }
        ];
        dIndex++;
      });
    } else {
      destinations = [
        this.tripBookingService.createDestinationFormGroup({
          id: guid(),
          sequence: 0,
          type: { value: DestinationType.Pickup, text: 'Pickup' },
          address: null
        }),
        this.tripBookingService.createDestinationFormGroup({
          id: guid(),
          sequence: 1,
          type: { value: DestinationType.Dropoff, text: 'Dropoff' },
          address: null
        })
      ];


      let dIndex = 0;
      destinations.forEach(d => {
        this.destinationButtons[dIndex] = [
          {
            handle: (index) => {
              this.addNewDestination(index, DestinationType.Pickup);
            },
            icon: '',
            label: 'Add Pickup'
          },
          {
            handle: (index) => {
              this.addNewDestination(index, DestinationType.Stop);
            },
            icon: '',
            label: 'Add Stop'
          },
          {
            handle: (index) => {
              this.addNewDestination(index, DestinationType.Dropoff);
            },
            icon: '',
            label: 'Add Dropoff'
          }
        ];
        dIndex++;
      });
    }

    var destinationsFormArray = (this.form.get('destinations') as FormArray);
    destinationsFormArray.clear();
    destinations.forEach(d => destinationsFormArray.push(d));
  }

  removeDestination(index: number): void {

    const destinationsFormArray = (this.form?.get('destinations') as FormArray);
    let pickups = 0;
    let stops = 0;
    let dropoffs = 0;
    destinationsFormArray.controls.forEach(f => {
      const type = f.get('type').value;
      if (type == DestinationType.Pickup) {
        pickups++;
      }
      if (type == DestinationType.Stop) {
        stops++;
      }
      if (type == DestinationType.Dropoff) {
        dropoffs++;
      }
    });

    const destination = (this.form?.get('destinations') as FormArray).controls[index];
    if (destination) {

      const destinationType = destination.get('type').value as DropdownItem<DestinationType>;
      if (destinationType.value == DestinationType.Pickup && pickups <= 1) {
        this.alertService.setErrorAlert('There should b one pickup')
        return;
      }

      if (destinationType.value == DestinationType.Dropoff && dropoffs <= 1) {
        this.alertService.setErrorAlert('There should b one dropoff')
        return;
      }

      (this.form?.get('destinations') as FormArray).removeAt(index);
    }
  }

  handleAddDestinationButtonClick(index: number, item: ActionButton): void {
    const btnIndex = this.destinationButtons[index].findIndex(f => f === item);
    this.destinationButtons[index][btnIndex].handle(index);
  }

  addNewDestination(index: number, type: DestinationType): void {
    const destinationTypes = GetDestinationTypeForDropdownList();
    const destinationType = destinationTypes.find(f => f.value == type);

    var destinationFormArray = this.form.get('destinations') as FormArray;

    const destinationFormGroup = destinationFormArray.value as TripDestinationModel[];

    destinationFormGroup.splice(index + 1, 0, {
      id: guid(),
      sequence: index + 1,
      type: destinationType,
      address: null
    });

    destinationFormArray.clear();
    let count = 0;
    destinationFormGroup.forEach(f => {
      if (count >= index) {
        f.sequence = count;
      }
      destinationFormArray.push(this.tripBookingService.createDestinationFormGroup(f));
      if (this.selectedTripRoute.value == (TripRoute.RoundTrip as number)) {
        this.destinationButtons[count] = [
          {
            handle: (index) => {
              this.addNewDestination(index, DestinationType.Pickup);
            },
            icon: '',
            label: 'Add Pickup'
          },
          {
            handle: (index) => {
              this.addNewDestination(index, DestinationType.Stop);
            },
            icon: '',
            label: 'Add Stop'
          },
          {
            handle: (index) => {
              this.addNewDestination(index, DestinationType.Address);
            },
            icon: '',
            label: 'Add Address'
          }
        ];
      } else {
        this.destinationButtons[count] = [
          {
            handle: (index) => {
              this.addNewDestination(index, DestinationType.Pickup);
            },
            icon: '',
            label: 'Add Pickup'
          },
          {
            handle: (index) => {
              this.addNewDestination(index, DestinationType.Stop);
            },
            icon: '',
            label: 'Add Stop'
          },
          {
            handle: (index) => {
              this.addNewDestination(index, DestinationType.Dropoff);
            },
            icon: '',
            label: 'Add Dropoff'
          }
        ];
      }
      count++;
    });

  }

  addNewPickup(): void {
    var pickupFormArray = this.form.get('pickups') as FormArray;
    pickupFormArray.push(this.tripBookingService.createPickupFormGroup(null));
  }

  removePickup(index: number): void {
    const len = (this.form?.get('pickups') as FormArray).controls.length;

    if (len <= 1) {
      this.alertService.setErrorAlert('There should b one pickup')
      return;
    }

    const pickup = (this.form?.get('pickups') as FormArray).controls[index];
    if (pickup) {
      (this.form?.get('pickups') as FormArray).removeAt(index);
    }
  }

  addNewStop(): void {
    var stopFormArray = this.form.get('stops') as FormArray;
    stopFormArray.push(this.tripBookingService.createStopFormGroup(null));
  }

  removeStop(index: number): void {

    const stop = (this.form?.get('stops') as FormArray).controls[index];
    if (stop) {
      (this.form?.get('stops') as FormArray).removeAt(index);
    }
  }

  addNewDropoff(): void {
    var dropoffFormArray = this.form.get('dropoffs') as FormArray;
    dropoffFormArray.push(this.tripBookingService.createDropoffFormGroup(null));
  }

  removeDropoff(index: number): void {
    const len = (this.form?.get('dropoffs') as FormArray).controls.length;

    if (len <= 1) {
      this.alertService.setErrorAlert('There should b one dropoff')
      return;
    }

    const dropoff = (this.form?.get('dropoffs') as FormArray).controls[index];
    if (dropoff) {
      (this.form?.get('dropoffs') as FormArray).removeAt(index);
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
        (response: ResponseModel<VehicalModel>) => {
          if (response.hasError) {
            return;
          }

          const vehcial = response.result as VehicalModel;

          this.form.get('vehical').setValue({
            text: vehcial.make + ' '
              + vehcial.model + ' '
              + vehcial.modelYear.toString(),
            value: vehcial.id
          });
          this.form.get('registrationPlate').setValue(vehcial.registrationPlate);

        }
      );
  }

  getDestinationTypeCount(destination: TripDestinationModel): number {
    var destinations = this.form.get('destinations').value as TripDestinationModel[];
    var destinationsByType = destinations.filter(f => f.type.value == destination.type.value);
    return destinationsByType.findIndex(f => f.id == destination.id);
  }

}
