import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { DriverService } from 'src/app/helper/services/drivers/driver.service';

@Component({
  selector: 'app-driver-view-vehicle',
  templateUrl: './driver-view-vehicle.component.html',
  styleUrls: ['./driver-view-vehicle.component.scss']
})
export class DriverViewVehicleComponent implements OnInit {

  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;
  id: string;

  constructor(
    public utilityService: UtilityService,
    private driverService: DriverService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.parent.params
      .subscribe((params: Params) => {
        if (params.id) {
          this.id = params.id;
          this.driverService.fetchDriverVehicleGridData(this.state, this.searchQuery, params.id);
          this.driverService.getDriverVehicleGridData()
            .subscribe(
              (data: any) => {
                this.gridData.data = data.data;
                this.gridData.total = data.total;
              }
            );
        }
      });

    
  }

  dataStateChange(state: DataStateChangeEvent): void {
    debugger;
    this.state = state;
    this.driverService.fetchDriverVehicleGridData(state, this.searchQuery, this.id);
  }
}


