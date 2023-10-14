import { DriverService } from './../../../../../helper/services/drivers/driver.service';
import { DriverGridModel } from './../../../../../helper/models/drivers/driver-grid-model';
import { ActionButton } from 'src/app/helper/models/common/grid/action-button';
import { GridToolbarService } from './../../../../../helper/services/common/grid-toolbar.service';
import { TripService } from './../../../../../helper/services/trips/trip.service';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PopupConfigModel } from 'src/app/helper/models/common/popup-config-model';

@Component({
  selector: 'app-drivers-all',
  templateUrl: './drivers-all.component.html',
  styleUrls: ['./drivers-all.component.css']
})
export class DriversAllComponent implements OnInit, OnDestroy {
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;

  pageSizeSubscription: Subscription;

  constructor(
    private driverService: DriverService,
    private router: Router,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit(): void {
    this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.driverService.fetchGridData(this.state, this.searchQuery);
        }
      );
    this.driverService.getAllocateVehicalPopup().subscribe(
      (config: PopupConfigModel) => {
        if (!config.show) {
          this.driverService.fetchGridData(this.state, this.searchQuery);
        }
      }
    );
    this.driverService.getDeallocateVehicalPopup().subscribe(
      (config: PopupConfigModel) => {
        if (!config.show) {
          this.driverService.fetchGridData(this.state, this.searchQuery);
        }
      }
    );
    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.driverService.fetchGridData(this.state, this.searchQuery);
        }
      );

    this.driverService.fetchGridData(this.state, this.searchQuery);
    this.driverService.getGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );
  }

  dataStateChange(state: DataStateChangeEvent): void {
    debugger;
    this.state = state;
    this.driverService.fetchGridData(state, this.searchQuery);
  }

  getGridActionMenuState(): boolean[] {
    const actionMenuState: boolean[] = [];
    this.gridData.data.forEach(() => {
      actionMenuState.push(false);
    });
    return actionMenuState;
  }

  getGridActions(item: DriverGridModel): ActionButton[] {
    const actions: ActionButton[] = [];
    if (item.vehicalAllocated) {
      actions.push({
        handle: () => {
          this.driverService.setDeallocateVehicalPopup(true, item.id);
        },
        icon: '',
        label: 'Deallocate Vehical'
      });

    } else {
      actions.push({
        handle: () => {
          this.driverService.setAllocateVehicalPopup(true, item.id);
        },
        icon: '',
        label: 'Allocate Vehical'
      });

    }

    return actions;
  }

  ngOnDestroy(): void {
    this.pageSizeSubscription.unsubscribe();
  }
}
