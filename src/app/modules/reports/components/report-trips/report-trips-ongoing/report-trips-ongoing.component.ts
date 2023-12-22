import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { flatten } from '@progress/kendo-angular-grid/dist/es2015/filtering/base-filter-cell.component';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { GetOpmForDropdownList, GetTripDestinationForDropdownList, GetTripRouteForDropdownList, GetTripStatusForDropdownList, OPM, TripDestination, TripRoute, TripStatus, TripType } from 'src/app/helper/common/shared-types';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { ReportService } from 'src/app/helper/services/utilities/report.service';
import { UtilityRix } from './../../../../../helper/common/utility-rix';
import { DropdownItem } from './../../../../../helper/models/common/dropdown/dropdown-item.model';
import { GridToolbarService } from './../../../../../helper/services/common/grid-toolbar.service';

@Component({
  selector: 'app-report-trips-ongoing',
  templateUrl: './report-trips-ongoing.component.html',
  styleUrls: ['./report-trips-ongoing.component.css']
})
export class ReportTripsOngoingComponent implements OnInit, OnDestroy {
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;

  tripRouteList: DropdownItem<TripRoute>[] = GetTripRouteForDropdownList();
  selectedTripRoute: DropdownItem<TripRoute>;

  opmList: DropdownItem<OPM>[] = GetOpmForDropdownList();
  selectedOpm: DropdownItem<OPM>;

  tripDestinationList: DropdownItem<TripDestination>[] = GetTripDestinationForDropdownList();
  selectedTripDestination: DropdownItem<TripDestination>;

  tripStatusList: DropdownItem<TripStatus>[] = GetTripStatusForDropdownList();
  selectedTripStatus: DropdownItem<TripStatus>;

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

    this.tripStatusList = this.tripStatusList.filter(f => f.value >= TripStatus.AssignedToDriver && f.value < TripStatus.Completed);

    this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.reportService.fetchAllTripGridData(this.state, this.searchQuery, TripType.Ongoing);
        }
      );
    this.gridSearchQuerySubscription = this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.reportService.fetchAllTripGridData(this.state, this.searchQuery, TripType.Ongoing);
        }
      );
    this.reportService.fetchAllTripGridData(this.state, this.searchQuery, TripType.Ongoing);
    this.gridDataSubscription = this.reportService.getAllTripGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );

  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.reportService.fetchAllTripGridData(state, this.searchQuery, TripType.Ongoing);
  }

  exportToExcel(grid: GridComponent): void {
    grid.saveAsExcel();
  }


  handleTripRouteValueChange(value: DropdownItem<TripRoute>): void {
    const root = { logic: 'and', filters: [], ...this.state.filter };
    const [filter] = flatten(root).filter(x => x.field === "tripRoute");
    if (!filter) {
      root.filters.push({
        field: "tripRoute",
        operator: "eq",
        value: value.value
      });
    } else {
      filter.value = value.value;
    }
    this.selectedTripRoute = value;
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

  handleTripDestinationValueChange(value: DropdownItem<TripDestination>): void {
    const root = { logic: 'and', filters: [], ...this.state.filter };
    const [filter] = flatten(root).filter(x => x.field === "tripDestination");
    if (!filter) {
      root.filters.push({
        field: "tripDestination",
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

  handleTripStatusValueChange(value: DropdownItem<TripStatus>): void {
    const root = { logic: 'and', filters: [], ...this.state.filter };
    const [filter] = flatten(root).filter(x => x.field === "tripStatus");
    if (!filter) {
      root.filters.push({
        field: "tripStatus",
        operator: "eq",
        value: value.value
      });
    } else {
      filter.value = value.value;
    }
    this.selectedTripStatus = value;
    this.state.filter = root;
    this.dataStateChange(this.state as DataStateChangeEvent);
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

    this.state.filter = null;
  }
}
