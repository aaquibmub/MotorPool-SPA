import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { flatten } from '@progress/kendo-angular-grid/dist/es2015/filtering/base-filter-cell.component';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { Gender, GetBooleanStatusForDropdownList, GetGenderForDropdownList, GetOpmForDropdownList, OPM } from 'src/app/helper/common/shared-types';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { ReportService } from 'src/app/helper/services/utilities/report.service';
import { UtilityRix } from './../../../../../helper/common/utility-rix';
import { DropdownItem } from './../../../../../helper/models/common/dropdown/dropdown-item.model';
import { GridToolbarService } from './../../../../../helper/services/common/grid-toolbar.service';

@Component({
  selector: 'app-report-passenger-trips',
  templateUrl: './report-passenger-trips.component.html',
  styleUrls: ['./report-passenger-trips.component.css']
})
export class ReportPassengerTripsComponent implements OnInit, OnDestroy {
  grid: GridComponent;
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;

  opmList: DropdownItem<OPM>[] = GetOpmForDropdownList();
  selectedOpm: DropdownItem<OPM>;

  genderList: DropdownItem<Gender>[] = GetGenderForDropdownList();
  selectedGender: DropdownItem<Gender>;

  passengerStatusList: DropdownItem<boolean>[] = GetBooleanStatusForDropdownList();
  selectedPassengerStatus: DropdownItem<boolean>;
  hiddenColumns: string[] = [];

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
          this.reportService.fetchPassengerTripGridData(this.state, this.searchQuery);
        }
      );

    this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.reportService.fetchPassengerTripGridData(this.state, this.searchQuery);
        }
      );
    this.gridSearchQuerySubscription = this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.reportService.fetchPassengerTripGridData(this.state, this.searchQuery);
        }
      );

    this.gridColumnsSubscription = this.gridToolbarService.getGridHiddenColumn()
      .subscribe(
        (column: string) => {
          debugger;
          this.hideColumn(column);
        }
      );

    this.reportService.fetchPassengerTripGridData(this.state, this.searchQuery);
    this.gridDataSubscription = this.reportService.getPassengerTripGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );

  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.reportService.fetchPassengerTripGridData(state, this.searchQuery);
  }

  exportToExcel(grid: GridComponent): void {
    grid.saveAsExcel();
  }

  handleGenderValueChange(value: DropdownItem<Gender>): void {
    const root = { logic: 'and', filters: [], ...this.state.filter };
    const [filter] = flatten(root).filter(x => x.field === "gender");
    if (!filter) {
      root.filters.push({
        field: "gender",
        operator: "eq",
        value: value.value
      });
    } else {
      filter.value = value.value;
    }
    this.selectedGender = value;
    this.state.filter = root;
    this.dataStateChange(this.state as DataStateChangeEvent);
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

  handlePassengerStatusValueChange(value: DropdownItem<boolean>): void {
    const root = { logic: 'and', filters: [], ...this.state.filter };
    const [filter] = flatten(root).filter(x => x.field === "passengerStatus");
    if (!filter) {
      root.filters.push({
        field: "passengerStatus",
        operator: "eq",
        value: value.value
      });
    } else {
      filter.value = value.value;
    }
    this.selectedPassengerStatus = value;
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

