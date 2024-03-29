import { Component, ElementRef, OnInit } from '@angular/core';
import { FormArray, UntypedFormArray, UntypedFormControl, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { guid } from '@progress/kendo-angular-common';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { DestinationType, GetDestinationTypeForDropdownList, TripRoute } from 'src/app/helper/common/shared-types';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ActionButton } from 'src/app/helper/models/common/grid/action-button';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { TripDestinationModel } from 'src/app/helper/models/trips/enroute/trip-destination-model';
import { TripDestinationDetailModel } from 'src/app/helper/models/trips/trip-edit/trip-destination-detail-model';
import { AddressService } from 'src/app/helper/services/address/address.service';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { TripBookingService } from 'src/app/helper/services/trips/trip-booking.service';
import { TripService } from 'src/app/helper/services/trips/trip.service';

@Component({
  selector: 'app-trip-edit-destination-list',
  templateUrl: './trip-edit-destination-list.component.html',
  styleUrls: ['./trip-edit-destination-list.component.css']
})
export class TripEditDestinationListComponent implements OnInit {
  id: string;
  model: TripDestinationDetailModel;
  form: UntypedFormGroup;

  addressList: DropdownItem<string>[];

  destinationButtons: ActionButton[][] = [];

  constructor(
    private el: ElementRef,
    public utilityService: UtilityService,
    private tripBookingService: TripBookingService,
    private tripService: TripService,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.route.parent.params
      .subscribe((params: Params) => {
        if (params.id) {
          this.id = params.id;

          this.tripService.getTripDestinationDetailModel(this.id)
            .subscribe(
              (model: TripDestinationDetailModel) => {
                this.model = model;
                this.initForm();
              }
            );

          this.addressService.getDropdownList('')
            .subscribe((list: DropdownItem<string>[]) => {
              this.addressList = list;
            });
        }
      });
  }

  private initForm(): void {

    let tripRoute: DropdownItem<TripRoute> = null;

    let startingPoint: DropdownItem<string> = null;
    let destinations: UntypedFormGroup[] = [];

    if (this.model) {

      tripRoute = this.model.tripRoute;

      startingPoint = this.model.startingPoint;

      if (this.model.destinations && this.model.destinations.length > 0) {
        let index = 0;
        // const destinationTypes = GetDestinationTypeForDropdownList();
        this.model.destinations.forEach(f => {
          // const type = destinationTypes.find(d => d.value == f.type.value);
          this.destinationButtons[index] = [
            {
              handle: (hIndex) => {
                this.addNewDestination(hIndex, DestinationType.Pickup);
              },
              icon: '',
              label: 'Add Pickup'
            },
            {
              handle: (hIndex) => {
                this.addNewDestination(hIndex, DestinationType.Stop);
              },
              icon: '',
              label: 'Add Stop'
            },
            {
              handle: (hIndex) => {
                this.addNewDestination(hIndex, DestinationType.Dropoff);
              },
              icon: '',
              label: 'Add Dropoff'
            }
          ]
          destinations.push(this.tripBookingService.createDestinationFormGroup(f));
          index++;
        });
      }

      this.form = new UntypedFormGroup({
        tripId: new UntypedFormControl(this.model.tripId),

        tripRoute: new UntypedFormControl(
          tripRoute, [UtilityRix.dropdownRequired as ValidatorFn]),

        startingPoint: new UntypedFormControl(startingPoint),

        destinations: new UntypedFormArray(destinations),

      });
    }

  }

  submit(): void {
    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    const formValue = this.form.value as TripDestinationDetailModel;

    const primaryAction = 'Save';
    const successAction = 'Saved';
    const primaryMsg = 'Do you want to save destinations?';

    const dialog: DialogRef = this.dialogService
      .open(this.alertService.getConfirmDialougeConfig(
        'Confirm ' + primaryAction, primaryMsg, primaryAction));

    dialog.result.subscribe((result: any) => {
      if (result.text === primaryAction) {
        this.tripService.updateTripDestinations(formValue)
          .subscribe(
            (response: ResponseModel<string>) => {
              debugger
              if (response.hasError) {
                this.alertService.setErrorAlert(response.msg);
                return;
              }

              this.alertService.setSuccessAlert(
                'Trip destinations are '
                + successAction
                + ' successfully');

              // this.signalRService.updateNotificationList();

              // this.utilityService.redirectToUrl('/trips');

            }
          );
      }
    });
  }

  getDestinationTypeCount(destination: TripDestinationModel): number {
    var destinations = this.form.get('destinations').value as TripDestinationModel[];
    var destinationsByType = destinations.filter(f => f.type.value == destination.type.value);
    return destinationsByType.findIndex(f => f.id == destination.id);
  }

  removeDestination(index: number): void {

    const destinationsFormArray = (this.form?.get('destinations') as FormArray);
    let pickups = 0;
    let stops = 0;
    let dropoffs = 0;
    destinationsFormArray.controls.forEach(f => {
      const type = f.get('type').value as DropdownItem<DestinationType>;
      if (type.value == DestinationType.Pickup) {
        pickups++;
      }
      if (type.value == DestinationType.Stop) {
        stops++;
      }
      if (type.value == DestinationType.Dropoff) {
        dropoffs++;
      }
    });

    const destination = (this.form?.get('destinations') as FormArray).controls[index];
    if (destination) {

      const destinationType = destination.get('type').value as DropdownItem<DestinationType>;
      if (destinationType.value == DestinationType.Pickup && pickups <= 1) {
        this.alertService.setErrorAlert('There should be one pickup')
        return;
      }
      if (destinationType.value == DestinationType.Dropoff && dropoffs <= 1) {
        this.alertService.setErrorAlert('There should be one dropoff')
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
    debugger;
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
      if (this.model.tripRoute.value == (TripRoute.RoundTrip as number)) {
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

}
