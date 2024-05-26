import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { flatten } from '@progress/kendo-angular-grid/dist/es2015/filtering/base-filter-cell.component';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { GetVehicalInspectionStatusForDropdownList } from 'src/app/helper/common/shared-types';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ActionButton } from 'src/app/helper/models/common/grid/action-button';
import { VehicalInspectionGridModel } from 'src/app/helper/models/vehicals/inspections/vehical-inspection-grid-model';
import { GridToolbarService } from 'src/app/helper/services/common/grid-toolbar.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { VehicalService } from 'src/app/helper/services/vehicals/vehical.service';

@Component({
  selector: 'app-vehical-inspection-all',
  templateUrl: './vehical-inspection-all.component.html',
  styleUrls: ['./vehical-inspection-all.component.css']
})
export class VehicalInspectionAllComponent implements OnInit, OnDestroy {
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;

  vehicleInspectionStatusList: DropdownItem<number>[] = [];
  selectedVehicleInspectionStatus: DropdownItem<number>;

  selectedDateFilter: Date;

  pageSizeSubscription: Subscription;
  gridFilterSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private vehicalService: VehicalService,
    private router: Router,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit(): void {
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
          this.vehicalService.fetchVehicalInspectionByStatusGridData(this.state, this.searchQuery);
        }
      );
    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.vehicalService.fetchVehicalInspectionByStatusGridData(this.state, this.searchQuery);
        }
      );

    this.vehicleInspectionStatusList = GetVehicalInspectionStatusForDropdownList();

    this.vehicalService.fetchVehicalInspectionByStatusGridData(this.state, this.searchQuery);
    this.vehicalService.getVehicalInspectionByStatusGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );
  }

  handleVehicleInspectionStatusValueChange(value: DropdownItem<number>): void {
    const root = { logic: 'and', filters: [], ...this.state.filter };
    const [filter] = flatten(root).filter(x => x.field === "status");
    if (!filter) {
      root.filters.push({
        field: "status",
        operator: "eq",
        value: value.value
      });
    } else {
      filter.value = value.value;
    }
    this.selectedVehicleInspectionStatus = value;
    this.state.filter = root;
    this.dataStateChange(this.state as DataStateChangeEvent);
  }

  handleDateTimeFilterOnChange(value: Date): void {
    const root = { logic: 'and', filters: [], ...this.state.filter };
    const [filter] = flatten(root).filter(x => x.field === "inspectionDate");
    if (!filter) {
      root.filters.push({
        field: "inspectionDate",
        operator: "eq",
        value: value
      });
    } else {
      filter.value = value;
    }
    this.selectedDateFilter = value;
    this.state.filter = root;
    this.dataStateChange(this.state as DataStateChangeEvent);
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.vehicalService.fetchVehicalInspectionByStatusGridData(state, this.searchQuery);
  }

  getGridActionMenuState(): boolean[] {
    const actionMenuState: boolean[] = [];
    this.gridData.data.forEach(() => {
      actionMenuState.push(false);
    });
    return actionMenuState;
  }

  getGridActions(item: VehicalInspectionGridModel): ActionButton[] {
    const actions: ActionButton[] = [];

    actions.push({
      handle: () => {
        this.router.navigate(['/vehicals/inspections/view/' + item.id + '/body']);
      },
      icon: '',
      label: 'View'
    });

    return actions;
  }

  ngOnDestroy(): void {
    this.pageSizeSubscription.unsubscribe();
    if (this.gridFilterSubscription) {
      this.gridFilterSubscription.unsubscribe();
    }
  }
}
