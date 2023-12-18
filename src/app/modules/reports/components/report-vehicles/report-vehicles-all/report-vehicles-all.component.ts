import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DropdownItem } from './../../../../../helper/models/common/dropdown/dropdown-item.model';
import { CommonService } from './../../../../../helper/services/common/common.service';
// import { FilterExpression } from "@progress/kendo-angular-filter";
import { DataStateChangeEvent, ExcelExportEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { flatten } from '@progress/kendo-angular-grid/dist/es2015/filtering/base-filter-cell.component';
import { CompositeFilterDescriptor, State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { GetBooleanForDropdownList, GetVehicalStatusForDropdownList } from 'src/app/helper/common/shared-types';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { GridToolbarService } from 'src/app/helper/services/common/grid-toolbar.service';
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
  pageable = false;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;

  checked = false;
  hasFilter = false;

  pageSizeSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private commonService: CommonService,
    private reportService: ReportService,
    private router: Router,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit(): void {

    this.vehicleStatusList = GetVehicalStatusForDropdownList();

    this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.reportService.fetchAllVehicleGridData(this.state, this.searchQuery);
        }
      );
    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.reportService.fetchAllVehicleGridData(this.state, this.searchQuery);
        }
      );

    this.reportService.fetchAllVehicleGridData(this.state, this.searchQuery);
    this.reportService.getAllVehicleGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );

  }

  handleArmouredSwitchChange(checked: boolean): void {
    this.hasFilter = true;
    const root = { logic: 'and', filters: [], ...this.state.filter };
    const [filter] = flatten(root).filter(x => x.field === "armoured");
    if (!filter) {
      root.filters.push({
        field: "armoured",
        operator: "eq",
        value: checked
      });
    } else {
      filter.value = checked;
    }
    this.checked = checked;
    this.state.filter = root;
    this.dataStateChange(this.state as DataStateChangeEvent);
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.reportService.fetchAllVehicleGridData(state, this.searchQuery);
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

  public opened = false;

  public filterValue: CompositeFilterDescriptor = this.state?.filter;

  public filters: any[] = [
    {
      field: "id",
      title: "Vehicle ID",
      editor: "string",
    },
    {
      field: "make",
      title: "Vehicle Make",
      editor: "string",
    },
    {
      field: "model",
      title: "Vehicle Model",
      editor: "string",
    },
    {
      field: "color",
      title: "Color",
      editor: "string",
    },
  ];

  public open(): void {
    this.opened = true;
  }

  public close(): void {
    this.opened = false;
  }

  public applyFilter(value: CompositeFilterDescriptor): void {
    this.state.filter = value;
    this.reportService.fetchAllVehicleGridData(this.state, this.searchQuery);
  }

  vehicleStatusList: DropdownItem<number>[] = [];
  selectedVehicleStatus: DropdownItem<number>;

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

  booleanList: DropdownItem<boolean>[] = GetBooleanForDropdownList();
  selectedArmoured: DropdownItem<boolean>;

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
    this.pageSizeSubscription.unsubscribe();
  }
}
