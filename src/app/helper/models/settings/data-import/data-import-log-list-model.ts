import { Time } from "@angular/common";
import { DataImportStatus } from 'src/app/helper/common/shared-types';
import { DataImportLogSummaryModel } from "./data-import-log-summary-model";

export class DataImportLogListModel {
  public fileName: string;
  public startTime: Date;
  public endTime?: Time;
  public status: DataImportStatus;
  public summary: DataImportLogSummaryModel[];
}
