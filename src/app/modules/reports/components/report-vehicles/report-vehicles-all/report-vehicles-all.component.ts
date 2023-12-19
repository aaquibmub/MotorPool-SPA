import { Component, OnDestroy, OnInit } from '@angular/core';
import { DropdownItem } from './../../../../../helper/models/common/dropdown/dropdown-item.model';
// import { FilterExpression } from "@progress/kendo-angular-filter";
import { DataStateChangeEvent, ExcelExportEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
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
  filterable = UtilityRix.gridConfig.filterable;

  gridDataSubscription: Subscription;

  vehicleStatusList: DropdownItem<number>[] = [];
  selectedVehicleStatus: DropdownItem<number>;

  booleanList: DropdownItem<boolean>[] = GetBooleanForDropdownList();
  selectedArmoured: DropdownItem<boolean>;

  constructor(
    public utilityService: UtilityService,
    private reportService: ReportService,
  ) { }

  ngOnInit(): void {

    this.vehicleStatusList = GetVehicalStatusForDropdownList();

    this.reportService.fetchAllVehicleGridData(this.state);
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
    this.reportService.fetchAllVehicleGridData(state);
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
          if (cellIndex === 5) { // armoured
            cell.value = cell.value == true ? 'Yes' : 'No';
          }
          if (cellIndex === 6) { // status
            cell.value = this.utilityService.getVehicalStatusLabel(cell.value);
          }
          cellIndex++;
        });
      }
    });
  }

  handleVehicleStatusValueChange(value: DropdownItem<number>): void {
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

    this.state.filter = null;
  }
}
