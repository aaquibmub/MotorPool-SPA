import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DriverViewDetailModel } from 'src/app/helper/models/drivers/driver-view/driver-view-detail-model';
import { TripViewModel } from 'src/app/helper/models/trips/trip-view/trip-view-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { DriverService } from 'src/app/helper/services/drivers/driver.service';
import { TripService } from 'src/app/helper/services/trips/trip.service';

@Component({
  selector: 'app-trip-view-driver',
  templateUrl: './trip-view-driver.component.html',
  styleUrls: ['./trip-view-driver.component.css']
})
export class TripViewDriverComponent implements OnInit {

  id: string;
  modelTrip: TripViewModel;
  model: DriverViewDetailModel;

  constructor(
    public utilityService: UtilityService,
    private driverService: DriverService,
    private route: ActivatedRoute,
    private tripService: TripService,
  ) { }

  ngOnInit(): void {
    this.route.parent.params
      .subscribe((params: Params) => {
        if (params.id) {
          this.tripService.getTripViewModel(params.id)
            .subscribe((model: TripViewModel) => {
              this.modelTrip = model;
              this.id = model.driverId;
              this.driverService.getDriverViewDetailModel(this.id)
                .subscribe((model: DriverViewDetailModel) => {
                  this.model = model;
                })
            })
        }
      });
  }
}