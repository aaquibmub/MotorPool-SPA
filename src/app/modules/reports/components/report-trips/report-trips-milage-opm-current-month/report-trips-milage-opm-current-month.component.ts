import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { OPM, TripType } from 'src/app/helper/common/shared-types';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { ReportService } from 'src/app/helper/services/utilities/report.service';
import { UtilityRix } from './../../../../../helper/common/utility-rix';
import { GridToolbarService } from './../../../../../helper/services/common/grid-toolbar.service';

@Component({
  selector: 'app-report-trips-milage-opm-current-month',
  templateUrl: './report-trips-milage-opm-current-month.component.html',
  styleUrls: ['./report-trips-milage-opm-current-month.component.css']
})
export class ReportTripsMilageOpmCurrentMonthComponent implements OnInit, OnDestroy {
  grid: GridComponent;
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;
  hiddenColumns: string[] = [];

  pageSizeSubscription: Subscription;
  gridDataSubscription: Subscription;
  gridSearchQuerySubscription: Subscription;
  gridColumnsSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private reportService: ReportService,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit(): void {

    this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.reportService.fetchTripMilageGridData(this.state, this.searchQuery, TripType.CurrentMonth, OPM.USSide);
        }
      );
    this.gridSearchQuerySubscription = this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.reportService.fetchTripMilageGridData(this.state, this.searchQuery, TripType.CurrentMonth, OPM.USSide);
        }
      );
    this.gridColumnsSubscription = this.gridToolbarService.getGridHiddenColumn()
      .subscribe(
        (column: string) => {
          debugger;
          this.hideColumn(column);
        }
      );
    this.reportService.fetchTripMilageGridData(this.state, this.searchQuery, TripType.CurrentMonth, OPM.USSide);
    this.gridDataSubscription = this.reportService.getTripMilageGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );

  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.reportService.fetchTripMilageGridData(state, this.searchQuery, TripType.CurrentMonth, OPM.USSide);
  }

  exportToExcel(grid: GridComponent): void {
    grid.saveAsExcel();
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
    if (this.gridColumnsSubscription) {
      this.gridColumnsSubscription.unsubscribe();
    }

    this.state.filter = null;
  }
}
