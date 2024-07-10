import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { PopupConfigModel } from 'src/app/helper/models/common/popup-config-model';
import { GridToolbarService } from 'src/app/helper/services/common/grid-toolbar.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { VehicalService } from 'src/app/helper/services/vehicals/vehical.service';

@Component({
  selector: 'app-vehicle-odo-meter-history',
  templateUrl: './vehicle-odo-meter-history.component.html',
  styleUrls: ['./vehicle-odo-meter-history.component.css']
})
export class VehicleOdoMeterHistoryComponent implements OnInit, OnDestroy {
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;

  pageSizeSubscription: Subscription;
  gridFilterSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private vehicalService: VehicalService,
    private router: Router,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit(): void {

    this.vehicalService.getUpdateOdoMeterPopup()
      .subscribe(
        (model: PopupConfigModel) => {
          this.vehicalService.fetchVehicalOdoMeterHistoryGridData(this.state, this.searchQuery);
        }
      );

    this.gridFilterSubscription = this.gridToolbarService.getGridFilter()
      .subscribe(
        (show: boolean) => {
          this.filterable = show ? UtilityRix.gridConfig.filterable : '';
        }
      );
    this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.vehicalService.fetchVehicalOdoMeterHistoryGridData(this.state, this.searchQuery);
        }
      );
    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.vehicalService.fetchVehicalOdoMeterHistoryGridData(this.state, this.searchQuery);
        }
      );


    this.vehicalService.fetchVehicalOdoMeterHistoryGridData(this.state, this.searchQuery);
    this.vehicalService.getVehicalOdoMeterHistoryGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.vehicalService.fetchVehicalOdoMeterHistoryGridData(state, this.searchQuery);
  }

  ngOnDestroy(): void {
    this.pageSizeSubscription.unsubscribe();
    if (this.gridFilterSubscription) {
      this.gridFilterSubscription.unsubscribe();
    }
  }
}
