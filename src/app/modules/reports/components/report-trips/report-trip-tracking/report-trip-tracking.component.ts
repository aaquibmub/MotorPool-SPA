import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DropdownType } from 'src/app/helper/common/shared-types';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ReportTripTrackingModel } from 'src/app/helper/models/reports/trips/trip-tracking/report-trip-tracking-model';
import { CommonService } from 'src/app/helper/services/common/common.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { ReportService } from 'src/app/helper/services/utilities/report.service';

@Component({
  selector: 'app-report-trip-tracking',
  templateUrl: './report-trip-tracking.component.html',
  styleUrls: ['./report-trip-tracking.component.css']
})
export class ReportTripTrackingComponent implements OnInit {
  selectedTripRoute: DropdownItem<number>;
  tripRouteList: DropdownItem<number>[];

  selectedDate: Date = new Date();
  selectedToDate: Date = new Date();

  model: ReportTripTrackingModel[];

  constructor(
    public utilityService: UtilityService,
    private commonService: CommonService,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.selectedDate.setDate(this.selectedDate.getDate() - 7);
    this.commonService.getDropdownList(DropdownType.TripRoute, '')
      .subscribe(
        (list: DropdownItem<number>[]) => {
          this.tripRouteList = list;
          this.fetchReport();
        });
  }

  handleTripRouteValueChange(value: DropdownItem<number>): void {
    this.selectedTripRoute = value;
    this.fetchReport();
  }

  handleDateValueChange(value: Date): void {
    this.selectedDate = value;
    this.fetchReport();
  }

  handleToDateValueChange(value: Date): void {
    this.selectedToDate = value;
    this.fetchReport();
  }

  fetchReport(): void {
    this.reportService.getTripTrackingModel(
      this.selectedDate,
      this.selectedToDate,
      this.selectedTripRoute?.value,
    )
      .subscribe(
        (model: ReportTripTrackingModel[]) => {
          this.model = model;
        }
      );
  }

  exportToExcel(): void {
    this.reportService.getTripTrackingExcel(
      this.selectedDate,
      this.selectedToDate,
      this.selectedTripRoute?.value,
    )
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.Response) {
            this.downloadFile(event);
          }
        }
      );
  }

  private downloadFile = (data: HttpResponse<Blob>) => {
    const downloadedFile = new Blob([data.body as BlobPart], { type: data.body?.type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = 'Trip Tracking - (' +
      // this.model?.passengerName +
      '-' +
      this.selectedDate.toDateString().toString() +
      '-' +
      this.selectedToDate.toDateString().toString() +
      ').xlsx';
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }

}
