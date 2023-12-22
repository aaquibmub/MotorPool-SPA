import { Component, OnDestroy, OnInit } from '@angular/core';
import { DropdownItem } from './../../../../../helper/models/common/dropdown/dropdown-item.model';
import { GridToolbarService } from './../../../../../helper/services/common/grid-toolbar.service';
// import { FilterExpression } from "@progress/kendo-angular-filter";
import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { flatten } from '@progress/kendo-angular-grid/dist/es2015/filtering/base-filter-cell.component';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { GetBooleanForDropdownList, GetVehicalStatusForDropdownList } from 'src/app/helper/common/shared-types';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { ReportService } from 'src/app/helper/services/utilities/report.service';


@Component({
  selector: 'app-report-vehicles-all',
  templateUrl: './report-vehicles-all.component.html',
  styleUrls: ['./report-vehicles-all.component.css']
})
export class ReportVehiclesAllComponent implements OnInit, OnDestroy {
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;

  vehicleStatusList: DropdownItem<number>[] = [];
  selectedVehicleStatus: DropdownItem<number>;

  booleanList: DropdownItem<boolean>[] = GetBooleanForDropdownList();
  selectedArmoured: DropdownItem<boolean>;

  pageSizeSubscription: Subscription;
  gridDataSubscription: Subscription;
  gridSearchQuerySubscription: Subscription;
  gridFilterSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private reportService: ReportService,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit(): void {

    this.gridFilterSubscription = this.gridToolbarService.getGridFilter()
      .subscribe(
        (show: boolean) => {
          this.filterable = show ? UtilityRix.gridConfig.filterable : '';
        }
      );

    this.vehicleStatusList = GetVehicalStatusForDropdownList();

    this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.reportService.fetchAllVehicleGridData(this.state, this.searchQuery);
        }
      );
    this.gridSearchQuerySubscription = this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.reportService.fetchAllVehicleGridData(this.state, this.searchQuery);
        }
      );

    this.reportService.fetchAllVehicleGridData(this.state, this.searchQuery);
    this.gridDataSubscription = this.reportService.getAllVehicleGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );

  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.reportService.fetchAllVehicleGridData(state, this.searchQuery);
  }

  exportToExcel(grid: GridComponent): void {
    grid.saveAsExcel();
  }

  handleVehicleStatusValueChange(value: DropdownItem<number>): void {
    const root = { logic: 'and', filters: [], ...this.state.filter };
    const [filter] = flatten(root).filter(x => x.field === "vehicleStatus");
    if (!filter) {
      root.filters.push({
        field: "vehicleStatus",
        operator: "eq",
        value: value.value
      });
    } else {
      filter.value = value.value;
    }
    this.selectedVehicleStatus = value;
    this.state.filter = root;
    this.dataStateChange(this.state as DataStateChangeEvent);
  }

  handleArmouredValueChange(value: DropdownItem<boolean>): void {
    const root = { logic: 'and', filters: [], ...this.state.filter };
    const [filter] = flatten(root).filter(x => x.field === "armoured");
    if (!filter) {
      root.filters.push({
        field: "armoured",
        operator: "eq",
        value: value.value
      });
    } else {
      filter.value = value.value;
    }
    this.selectedArmoured = value;
    this.state.filter = root;
    this.dataStateChange(this.state as DataStateChangeEvent);
  }

  ngOnDestroy(): void {
    if (this.gridDataSubscription) {
      this.gridDataSubscription.unsubscribe();
    }
    if (this.gridFilterSubscription) {
      this.gridFilterSubscription.unsubscribe();
    }

    this.state.filter = null;
  }
}
