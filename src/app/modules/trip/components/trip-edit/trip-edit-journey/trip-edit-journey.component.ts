import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DestinationType, TripStatus } from 'src/app/helper/common/shared-types';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { TripService } from 'src/app/helper/services/trips/trip.service';
import { ResponseModel } from './../../../../../helper/models/common/response-model';
import { TripJourneyModel } from './../../../../../helper/models/trips/trip-edit/trip-journey-model';

@Component({
  selector: 'app-trip-edit-journey',
  templateUrl: './trip-edit-journey.component.html',
  styleUrls: ['./trip-edit-journey.component.css']
})
export class TripEditJourneyComponent implements OnInit {

  model: TripJourneyModel;
  meterReadingStart?: number;
  meterReadingEnd?: number;
  nextStatus: TripStatus;
  actionLable: string;

  tripStatus = TripStatus;

  constructor(
    public utilityService: UtilityService,
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.route.parent.params
      .subscribe((params: Params) => {
        if (params.id) {
          this.getTripLatestStatus(params.id);
        }
      });
  }

  getTripLatestStatus(id: string): void {
    this.tripService.getTripJourneyModel(id)
      .subscribe((model: TripJourneyModel) => {
        this.model = model;
        this.meterReadingStart = model.odoMeterAtStart;
        this.meterReadingEnd = model.odoMeterAtEnd;
        this.nextStatus = this.getNextTripStatus();
        this.actionLable = this.getTripEnrouteButtonText();
      });
  }

  startTrip(): void {
    this.tripService.updateTripStatus({
      tripId: this.model.tripId,
      status: TripStatus.TripStarted,
      remarks: ''
    }).subscribe((response: ResponseModel<string>) => {
      if (response.hasError) {
        this.alertService.setErrorAlert(response.msg);
        return;
      }
      this.getTripLatestStatus(this.model.tripId);
    });
  }

  startOdoMeter(): void {
    if (!this.meterReadingStart) {
      return;
    }
    this.tripService.updateTripVehicleMeter({
      tripId: this.model.tripId,
      meterReading: this.meterReadingStart,
      status: TripStatus.OdoMeterAtStart,
    }).subscribe((response: ResponseModel<string>) => {
      if (response.hasError) {
        this.alertService.setErrorAlert(response.msg);
        return;
      }
      this.tripService.updateTripStatus({
        tripId: this.model.tripId,
        status: TripStatus.VehicalDispatched,
        remarks: ''
      }).subscribe((response: ResponseModel<string>) => {
        if (response.hasError) {
          this.alertService.setErrorAlert(response.msg);
          return;
        }
        this.getTripLatestStatus(this.model.tripId);
      });
    });
  }

  dispatchVehicle(): void {
    this.tripService.updateTripStatus({
      tripId: this.model.tripId,
      status: TripStatus.VehicalDispatched,
      remarks: ''
    }).subscribe((response: ResponseModel<string>) => {
      if (response.hasError) {
        this.alertService.setErrorAlert(response.msg);
        return;
      }
      this.getTripLatestStatus(this.model.tripId);
    });
  }

  proceed(): void {
    var tripStatus = this.getNextTripStatus();
    this.tripService.updateTripStatus({
      tripId: this.model.tripId,
      status: tripStatus,
      destinationId: this.getNextTripDestinationId(),
      addressId: this.getNextTripAddressId(),
      remarks: ''
    }).subscribe((response: ResponseModel<string>) => {
      if (response.hasError) {
        this.alertService.setErrorAlert(response.msg);
        return;
      }
      if (tripStatus == TripStatus.ArrivedAtPickupLocation
        || tripStatus == TripStatus.ArrivedAtAddress
        || tripStatus == TripStatus.ArrivedAtStop) {
        this.tripService.updateTripStatus({
          tripId: this.model.tripId,
          status: tripStatus == TripStatus.ArrivedAtPickupLocation
            ? TripStatus.WaitingForPassenger
            : tripStatus == TripStatus.ArrivedAtAddress
              ? TripStatus.WaitingForAddressActivity
              : tripStatus == TripStatus.ArrivedAtStop
                ? TripStatus.WaitingForStopActivity
                : tripStatus,
          destinationId: this.getNextTripDestinationId(),
          addressId: this.getNextTripAddressId(),
          remarks: ''
        }).subscribe((response: ResponseModel<string>) => {
          if (response.hasError) {
            this.alertService.setErrorAlert(response.msg);
            return;
          }
          this.getTripLatestStatus(this.model.tripId);
        });
      } else {
        this.getTripLatestStatus(this.model.tripId);
      }
    });
  }

  endOdoMeter(): void {
    if (!this.meterReadingStart) {
      return;
    }
    this.tripService.updateTripVehicleMeter({
      tripId: this.model.tripId,
      meterReading: this.meterReadingEnd,
      status: TripStatus.OdoMeterAtEnd,
    }).subscribe((response: ResponseModel<string>) => {
      if (response.hasError) {
        this.alertService.setErrorAlert(response.msg);
        return;
      }
      this.tripService.updateTripStatus({
        tripId: this.model.tripId,
        status: TripStatus.Completed,
        remarks: ''
      }).subscribe((response: ResponseModel<string>) => {
        if (response.hasError) {
          this.alertService.setErrorAlert(response.msg);
          return;
        }
        this.getTripLatestStatus(this.model.tripId);
      });
    });
  }

  getNextTripStatus(): TripStatus {
    var status = this.model.tripStatus;

    if (status == TripStatus.Completed) {
      return null;
    }

    if (status == TripStatus.OdoMeterAtEnd) {
      return TripStatus.Completed;
    }

    var nextDestination = this.model.items[this.model.items.length - 1];
    var endTrip = nextDestination.completed;

    if (endTrip) {
      return TripStatus.OdoMeterAtEnd;
    }

    if (status == TripStatus.TripStarted) {
      return TripStatus.VehicalDispatched;
    }
    if (status == TripStatus.VehicalDispatched) {
      return TripStatus.ArrivedAtPickupLocation;
    }
    if (status == TripStatus.ArrivedAtPickupLocation) {
      return TripStatus.WaitingForPassenger;
    }
    if (status == TripStatus.WaitingForPassenger) {
      return TripStatus.PassengerOnboarded;
    }
    if (status == TripStatus.ArrivedAtStop) {
      return TripStatus.WaitingForStopActivity;
    }
    if (status == TripStatus.WaitingForStopActivity) {
      return TripStatus.TripResumedAfterStop;
    }
    if (status == TripStatus.ArrivedAtAddress) {
      return TripStatus.WaitingForAddressActivity;
    }
    if (status == TripStatus.WaitingForAddressActivity) {
      return TripStatus.TripResumedAfterAddress;
    }
    var destinationType = nextDestination.destinationType.value;
    if (destinationType == DestinationType.Pickup) {
      return TripStatus.ArrivedAtPickupLocation;
    } else if (destinationType == DestinationType.Stop) {
      return TripStatus.ArrivedAtStop;
    } else if (destinationType == DestinationType.Address) {
      return TripStatus.ArrivedAtAddress;
    } else {
      return TripStatus.ArrivedAtDropoff;
    }
  }

  getNextTripDestinationId(): string {
    var index = this.model.items.length - 1;
    var tripEnrouteItem = this.model.items[index];
    var destinationId =
      tripEnrouteItem != null ? tripEnrouteItem.destinationId : null;

    return destinationId;
  }

  getNextTripAddressId(): string {
    var index = this.model.items.length - 1;
    var tripEnrouteItem = this.model.items[index];
    var address = tripEnrouteItem != null ? tripEnrouteItem.location : null;

    return address != null ? address.value : null;
  }

  getTripEnrouteButtonText(): string {
    var status = this.model.tripStatus;

    if (status == TripStatus.OdoMeterAtEnd) {
      return "END TRIP";
    }

    var nextDestination = this.model.items[this.model.items.length - 1];
    var endTrip = nextDestination.completed;

    if (endTrip) {
      return "METER READING";
    }

    if (status == TripStatus.OdoMeterAtStart) {
      return "DISPATCH";
    }
    if (status == TripStatus.VehicalDispatched) {
      return "ARRIVED AT PICKUP";
    }
    if (status == TripStatus.ArrivedAtPickupLocation ||
      status == TripStatus.ArrivedAtStop ||
      status == TripStatus.ArrivedAtAddress) {
      return "RESUME TRIP";
    }
    if (status == TripStatus.WaitingForPassenger) {
      return "PASSENGER ON BOARDED";
    }
    if (status == TripStatus.WaitingForStopActivity) {
      return "RESUME TRIP";
    }
    if (status == TripStatus.WaitingForAddressActivity) {
      return "RESUME TRIP";
    }
    return "ARRIVED AT " + nextDestination.destinationType.text.toUpperCase();
  }

  cancel(): void {

  }

}
