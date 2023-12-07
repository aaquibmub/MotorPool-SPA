import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DriverViewDetailModel } from 'src/app/helper/models/drivers/driver-view/driver-view-detail-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { DriverService } from 'src/app/helper/services/drivers/driver.service';

@Component({
  selector: 'app-driver-view-detail',
  templateUrl: './driver-view-detail.component.html',
  styleUrls: ['./driver-view-detail.component.scss']
})
export class DriverViewDetailComponent implements OnInit {

  model: DriverViewDetailModel;

  constructor(
    public utilityService: UtilityService,
    private driverService: DriverService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.parent.params
      .subscribe((params: Params) => {
        if (params.id) {
          this.driverService.getDriverViewDetailModel(params.id)
            .subscribe((model: DriverViewDetailModel) => {
              this.model = model;
            })
        }
      });
  }

}
