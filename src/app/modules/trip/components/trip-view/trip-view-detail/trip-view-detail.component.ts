import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { UtilityService } from "../../../../../helper/services/common/utility.service";
import { TripService } from "../../../../../helper/services/trips/trip.service";
import { TripViewDetailModel } from './../../../../../helper/models/trips/trip-view/trip-view-detail-model';

@Component({
  selector: 'app-trip-view-detail',
  templateUrl: './trip-view-detail.component.html',
  styleUrls: ['./trip-view-detail.component.css']
})
export class TripViewDetailComponent implements OnInit {

  model: TripViewDetailModel;

  constructor(
    public utilityService: UtilityService,
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.parent.params
      .subscribe((params: Params) => {
        if (params.id) {
          this.tripService.getTripViewDetailModel(params.id)
            .subscribe((model: TripViewDetailModel) => {
              this.model = model;
            })
        }
      });
  }

}
