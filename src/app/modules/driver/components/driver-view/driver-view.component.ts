import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DriverViewModel } from 'src/app/helper/models/drivers/driver-view/driver-view-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { DriverService } from 'src/app/helper/services/drivers/driver.service';
import { TripService } from 'src/app/helper/services/trips/trip.service';

@Component({
  selector: 'app-driver-view',
  templateUrl: './driver-view.component.html',
  styleUrls: ['./driver-view.component.scss']
})
export class DriverViewComponent implements OnInit {

  model: DriverViewModel;
  detailExecutePopupSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private driverService: DriverService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.params
      .subscribe((params: Params) => {
        if (params.id) {
          this.driverService.getDriverViewModel(params.id)
            .subscribe((model: DriverViewModel) => {
              this.model = model;
            })
        }
      });
      
  }

  cancel(): void {
    this.router.navigate(['/trips/bookings/start-now']);
  }

}
