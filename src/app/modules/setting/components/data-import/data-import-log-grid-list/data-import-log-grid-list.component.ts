import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { DataImportEntity, DataImportStatus } from 'src/app/helper/common/shared-types';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { DataImportLogSummaryModel } from 'src/app/helper/models/settings/data-import/data-import-log-summary-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { ImportService } from 'src/app/helper/services/utilities/import.service';

@Component({
  selector: 'app-data-import-log-grid-list',
  templateUrl: './data-import-log-grid-list.component.html',
  styleUrls: ['./data-import-log-grid-list.component.css']
})
export class DataImportLogGridListComponent implements OnInit, OnDestroy {

  @Input() entity: DataImportEntity;
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;

  gridDataSubs: Subscription;

  constructor(
    private importService: ImportService,
    private utilityService: UtilityService,
    // private excelService: ExcelService,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.importService.fetchGridData(this.state, this.entity)
    this.importService.getGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );
  }
  getDataImportStatusFor(item: DataImportStatus): string {
    return this.utilityService.getDataImportStatusLabel(item);
  }
  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.importService.fetchGridData(state, this.entity);
  }
  downloadSummary(summary: DataImportLogSummaryModel[]) {
    // this.excelService.generateDataImportSummaryLogExcel(summary, this.entity);
  }

  ngOnDestroy(): void {
    if (this.gridDataSubs) {
      this.gridDataSubs.unsubscribe();
    }
  }
}
