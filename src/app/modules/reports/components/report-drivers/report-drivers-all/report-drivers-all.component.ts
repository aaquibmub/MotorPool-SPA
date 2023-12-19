import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStateChangeEvent, ExcelExportEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { flatten } from '@progress/kendo-angular-grid/dist/es2015/filtering/base-filter-cell.component';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { GetBooleanForDropdownList, GetDriverStatusForDropdownList } from 'src/app/helper/common/shared-types';
import { UtilityRix } from './../../../../../helper/common/utility-rix';
import { DropdownItem } from './../../../../../helper/models/common/dropdown/dropdown-item.model';
import { UtilityService } from './../../../../../helper/services/common/utility.service';
import { ReportService } from './../../../../../helper/services/utilities/report.service';

@Component({
  selector: 'app-report-drivers-all',
  templateUrl: './report-drivers-all.component.html',
  styleUrls: ['./report-drivers-all.component.css']
})
export class ReportDriversAllComponent implements OnInit, OnDestroy {
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  filterable = UtilityRix.gridConfig.filterable;

  gridDataSubscription: Subscription;

  driverStatusList: DropdownItem<number>[] = [];
  selectedDriverStatus: DropdownItem<number>;

  booleanList: DropdownItem<boolean>[] = GetBooleanForDropdownList();
  selectedArmoured: DropdownItem<boolean>;

  constructor(
    public utilityService: UtilityService,
    private reportService: ReportService,
  ) { }

  ngOnInit(): void {

    this.driverStatusList = GetDriverStatusForDropdownList();

    this.reportService.fetchAllDriverGridData(this.state);
    this.gridDataSubscription = this.reportService.getAllDriverGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );

  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.reportService.fetchAllDriverGridData(state);
  }

  exportToExcel(grid: GridComponent): void {
    grid.saveAsExcel();
  }

  onExcelExport(e: ExcelExportEvent): void {
    const rows = e.workbook.sheets[0].rows;
    // set alternating row color
    rows.forEach((row) => {
      if (row.type === "data") {
        let cellIndex = 0;
        row.cells.forEach((cell) => {
          if (cellIndex === 6) { // status
            cell.value = this.utilityService.getDriverStatusLabel(cell.value);
          }
          cellIndex++;
        });
      }
    });
  }

  handleDriverStatusValueChange(value: DropdownItem<number>): void {
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
    this.selectedDriverStatus = value;
    this.state.filter = root;
    this.dataStateChange(this.state as DataStateChangeEvent);
  }

  ngOnDestroy(): void {
    if (this.gridDataSubscription) {
      this.gridDataSubscription.unsubscribe();
    }

    this.state.filter = null;
  }
}
