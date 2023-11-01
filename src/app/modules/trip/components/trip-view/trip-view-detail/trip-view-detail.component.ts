import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {NotificationService} from "@progress/kendo-angular-notification";
import {OverlayService} from "../../../../../helper/services/common/overlay.service";
import { DialogService} from "@progress/kendo-angular-dialog";
import {UtilityService} from "../../../../../helper/services/common/utility.service";
import {CommonService} from "../../../../../helper/services/common/common.service";
import {TripBookingService} from "../../../../../helper/services/trips/trip-booking.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TripService} from "../../../../../helper/services/trips/trip.service";
import {TripViewModel} from "../../../../../helper/models/trips/trip-bookings/trip-view-model"
import { PassengerModel } from './../../../../../helper/models/passengers/passenger-model';

@Component({
  selector: 'app-trip-view-detail',
  templateUrl: './trip-view-detail.component.html',
  styleUrls: ['./trip-view-detail.component.css']
})
export class TripViewDetailComponent implements OnInit {

  model: TripViewModel;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private notificationService: NotificationService,
    private overlayService: OverlayService,
    private dialogService: DialogService,
    public utilityService: UtilityService,
    private commonService: CommonService,
    private tripBookingService: TripBookingService,
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    let isRequesterTraveling = true;


    this.route.params
      .subscribe((params: Params) => {
        if (params.id) {
          this.tripService.fetchTripById(params.id).subscribe({
            next: (response: any) => {
              this.model = response;
            }
          })

        }
      });
  }

  cancel(): void {
    this.router.navigate(['/trips/bookings/start-now']);
  }

}
