import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { flatten } from '@progress/kendo-angular-grid/dist/es2015/filtering/base-filter-cell.component';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { GetOpmForDropdownList, GetTripDestinationForDropdownList, OPM, TripDestination } from 'src/app/helper/common/shared-types';
import { ReportService } from 'src/app/helper/services/utilities/report.service';
import { UtilityRix } from './../../../../../helper/common/utility-rix';
import { DropdownItem } from './../../../../../helper/models/common/dropdown/dropdown-item.model';
import { GridToolbarService } from './../../../../../helper/services/common/grid-toolbar.service';
import { UtilityService } from './../../../../../helper/services/common/utility.service';

@Component({
  selector: 'app-report-driver-trips',
  templateUrl: './report-driver-trips.component.html',
  styleUrls: ['./report-driver-trips.component.css']
})
export class ReportDriverTripsComponent implements OnInit, OnDestroy {
  grid: GridComponent;
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;
  hiddenColumns: string[] = [];

  opmList: DropdownItem<OPM>[] = GetOpmForDropdownList();
  selectedOpm: DropdownItem<OPM>;

  tripDestinationList: DropdownItem<TripDestination>[] = GetTripDestinationForDropdownList();
  selectedTripDestination: DropdownItem<TripDestination>;

  pageSizeSubscription: Subscription;
  gridDataSubscription: Subscription;
  gridSearchQuerySubscription: Subscription;
  gridFilterSubscription: Subscription;
  gridColumnsSubscription: Subscription;

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
          this.state.filter = null;
          this.reportService.fetchDriverTripGridData(this.state, this.searchQuery);
        }
      );

    this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.reportService.fetchDriverTripGridData(this.state, this.searchQuery);
        }
      );
    this.gridSearchQuerySubscription = this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.reportService.fetchDriverTripGridData(this.state, this.searchQuery);
        }
      );

    this.gridColumnsSubscription = this.gridToolbarService.getGridHiddenColumn()
      .subscribe(
        (column: string) => {
          debugger;
          this.hideColumn(column);
        }
      );
    this.reportService.fetchDriverTripGridData(this.state, this.searchQuery);
    this.gridDataSubscription = this.reportService.getDriverTripGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );

  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.reportService.fetchDriverTripGridData(state, this.searchQuery);
  }

  exportToExcel(grid: GridComponent): void {
    grid.saveAsExcel();
  }

  handleOpmValueChange(value: DropdownItem<OPM>): void {
    const root = { logic: 'and', filters: [], ...this.state.filter };
    const [filter] = flatten(root).filter(x => x.field === "opm");
    if (!filter) {
      root.filters.push({
        field: "opm",
        operator: "eq",
        value: value.value
      });
    } else {
      filter.value = value.value;
    }
    this.selectedOpm = value;
    this.state.filter = root;
    this.dataStateChange(this.state as DataStateChangeEvent);
  }

  handleTripDestinationValueChange(value: DropdownItem<TripDestination>): void {
    const root = { logic: 'and', filters: [], ...this.state.filter };
    const [filter] = flatten(root).filter(x => x.field === "destination");
    if (!filter) {
      root.filters.push({
        field: "destination",
        operator: "eq",
        value: value.value
      });
    } else {
      filter.value = value.value;
    }
    this.selectedTripDestination = value;
    this.state.filter = root;
    this.dataStateChange(this.state as DataStateChangeEvent);
  }

  isHidden(columnName: string): boolean {
    return this.hiddenColumns.indexOf(columnName) > -1;
  }

  hideColumn(columnName: string): void {
    const hiddenColumns = this.hiddenColumns;

    if (!this.isHidden(columnName)) {
      hiddenColumns.push(columnName);
    } else {
      hiddenColumns.splice(hiddenColumns.indexOf(columnName), 1);
    }
  }

  ngOnDestroy(): void {
    if (this.pageSizeSubscription) {
      this.pageSizeSubscription.unsubscribe();
    }
    if (this.gridDataSubscription) {
      this.gridDataSubscription.unsubscribe();
    }
    if (this.gridSearchQuerySubscription) {
      this.gridSearchQuerySubscription.unsubscribe();
    }
    if (this.gridFilterSubscription) {
      this.gridFilterSubscription.unsubscribe();
    }
    if (this.gridColumnsSubscription) {
      this.gridColumnsSubscription.unsubscribe();
    }

    this.state.filter = null;
  }
}
