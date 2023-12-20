import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { TripViewDetailModel } from 'src/app/helper/models/trips/trip-view/trip-view-detail-model';
import { TripViewModel } from 'src/app/helper/models/trips/trip-view/trip-view-model';
import { VehicalViewDetailModel } from 'src/app/helper/models/vehicals/vehical-view-detail-model';
import { GridToolbarService } from 'src/app/helper/services/common/grid-toolbar.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { TripService } from 'src/app/helper/services/trips/trip.service';
import { VehicalService } from 'src/app/helper/services/vehicals/vehical.service';

@Component({
  selector: 'app-trip-view-vehical',
  templateUrl: './trip-view-vehical.component.html',
  styleUrls: ['./trip-view-vehical.component.css']
})
export class TripViewVehicalComponent implements OnInit {

  id: string;
  modelTrip: TripViewModel;
  model: VehicalViewDetailModel;

  constructor(
    public utilityService: UtilityService,
    private vehicalService: VehicalService,
    private route: ActivatedRoute,
    private gridToolbarService: GridToolbarService,
    private tripService: TripService,
  ) { }

  ngOnInit(): void {
    this.route.parent.params
      .subscribe((params: Params) => {
        if (params.id) {
          this.tripService.getTripViewModel(params.id)
            .subscribe((model: TripViewModel) => {
              this.modelTrip = model;
              this.id = model.vehicleId;
              this.vehicalService.getVehicalViewDetailModel(this.id)
                .subscribe((model: VehicalViewDetailModel) => {
                  this.model = model;
                })
            })
        }
      });
  }
}
