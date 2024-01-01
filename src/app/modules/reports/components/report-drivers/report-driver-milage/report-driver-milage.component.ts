import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { AggregateDescriptor, State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { ReportService } from 'src/app/helper/services/utilities/report.service';
import { UtilityRix } from './../../../../../helper/common/utility-rix';
import { GridToolbarService } from './../../../../../helper/services/common/grid-toolbar.service';

@Component({
  selector: 'app-report-driver-milage',
  templateUrl: './report-driver-milage.component.html',
  styleUrls: ['./report-driver-milage.component.css']
})
export class ReportDriverMilageComponent implements OnInit, OnDestroy {
  grid: GridComponent;
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  aggregates: AggregateDescriptor[] = [
    { field: 'MilageInKm', aggregate: 'sum' }
  ];
  aggregateResult: any[] = [];
  searchQuery: string;
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
          this.reportService.fetchDriverMilageGridData(this.state, this.searchQuery, this.aggregates);
        }
      );

    this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.reportService.fetchDriverMilageGridData(this.state, this.searchQuery, this.aggregates);
        }
      );
    this.gridSearchQuerySubscription = this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.reportService.fetchDriverMilageGridData(this.state, this.searchQuery, this.aggregates);
        }
      );

    this.gridColumnsSubscription = this.gridToolbarService.getGridHiddenColumn()
      .subscribe(
        (column: string) => {
          debugger;
          this.hideColumn(column);
        }
      );
    this.reportService.fetchDriverMilageGridData(this.state, this.searchQuery, this.aggregates);
    this.gridDataSubscription = this.reportService.getDriverMilageGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
          this.aggregateResult = data.aggregates;
        }
      );

  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.reportService.fetchDriverMilageGridData(state, this.searchQuery, this.aggregates);
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
    if (this.gridFilterSubscription) {
      this.gridFilterSubscription.unsubscribe();
    }
    if (this.gridColumnsSubscription) {
      this.gridColumnsSubscription.unsubscribe();
    }

    this.state.filter = null;
  }
}
