import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TripStatus } from 'src/app/helper/common/shared-types';
import { PopupConfigModel } from 'src/app/helper/models/common/popup-config-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { TripService } from 'src/app/helper/services/trips/trip.service';
import { TripViewModel } from '../../../../helper/models/trips/trip-view/trip-view-model';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css']
})
export class TripViewComponent implements OnInit, OnDestroy {

  model: TripViewModel;

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
          this.tripService.getTripViewModel(params.id)
            .subscribe((model: TripViewModel) => {
              this.model = model;
            })
        }
      });

    this.tripExecutePopupSubscription = this.tripService.getTripExecutePopup()
      .subscribe(
        (config: PopupConfigModel) => {
          if (!config.show) {
            this.utilityService.redirectToUrl('/trips/view/' + this.model.id + '/detail');
          }
        }
      );

    this.tripHandoverPopupSubscription = this.tripService.getTripHandoverPopup()
      .subscribe(
        (config: PopupConfigModel) => {
          if (!config.show) {
            this.utilityService.redirectToUrl('/trips/view/' + this.model.id + '/detail');
          }
        }
      );

    this.tripCancelPopupSubscription = this.tripService.getTripCancelPopup()
      .subscribe(
        (config: PopupConfigModel) => {
          if (!config.show) {
            this.utilityService.redirectToUrl('/trips/view/' + this.model.id + '/detail');
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
