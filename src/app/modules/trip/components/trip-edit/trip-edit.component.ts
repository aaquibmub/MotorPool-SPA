import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { TripStatus } from './../../../../helper/common/shared-types';
import { PopupConfigModel } from './../../../../helper/models/common/popup-config-model';
import { TripModel } from './../../../../helper/models/trips/trip-edit/trip-model';
import { TripService } from './../../../../helper/services/trips/trip.service';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css']
})
export class TripEditComponent implements OnInit, OnDestroy {

  model: TripModel;

  status = TripStatus;

  tripExecutePopupSubscription: Subscription;
  tripHandoverPopupSubscription: Subscription;
  tripCancelPopupSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.params
      .subscribe((params: Params) => {
        if (params.id) {
          this.tripService.getTripModel(params.id)
            .subscribe((model: TripModel) => {
              this.model = model;
            })
        }
      });

    this.tripExecutePopupSubscription = this.tripService.getTripExecutePopup()
      .subscribe(
        (config: PopupConfigModel) => {
          if (!config.show) {
            this.utilityService.redirectToUrl('/trips/edit/' + this.model.id + '/journey');
          }
        }
      );

    this.tripHandoverPopupSubscription = this.tripService.getTripHandoverPopup()
      .subscribe(
        (config: PopupConfigModel) => {
          if (!config.show) {
            this.utilityService.redirectToUrl('/trips/edit/' + this.model.id + '/journey');
          }
        }
      );

    this.tripCancelPopupSubscription = this.tripService.getTripCancelPopup()
      .subscribe(
        (config: PopupConfigModel) => {
          if (!config.show) {
            this.utilityService.redirectToUrl('/trips/edit/' + this.model.id + '/journey');
          }
        }
      );
  }

  executeTrip(): void {
    this.tripService.setTripExecutePopup(true, this.model.id);
  }

  handoverTrip(): void {
    this.tripService.setTripHandoverPopup(true, this.model.id);
  }

  cancelTrip(): void {
    this.tripService.setTripCancelPopup(true, this.model.id);
  }

  cancel(): void {
    this.router.navigate(['/trips/bookings/start-now']);
  }

  ngOnDestroy(): void {
    if (this.tripExecutePopupSubscription) {
      this.tripExecutePopupSubscription.unsubscribe();
    }
    if (this.tripCancelPopupSubscription) {
      this.tripCancelPopupSubscription.unsubscribe();
    }
  }

}
