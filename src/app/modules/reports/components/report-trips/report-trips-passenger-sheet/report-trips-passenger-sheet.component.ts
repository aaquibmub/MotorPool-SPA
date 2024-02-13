import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ReportTripPassengerSheetModel } from 'src/app/helper/models/reports/trips/passenger-sheet/report-trip-passenger-sheet-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { ReportService } from 'src/app/helper/services/utilities/report.service';
import { PassengerService } from './../../../../../helper/services/trips/passenger.service';

@Component({
  selector: 'app-report-trips-passenger-sheet',
  templateUrl: './report-trips-passenger-sheet.component.html',
  styleUrls: ['./report-trips-passenger-sheet.component.css']
})
export class ReportTripsPassengerSheetComponent implements OnInit {
  selectedPassenger: DropdownItem<string>;
  passengerList: DropdownItem<string>[];

  selectedDate: Date = new Date();
  selectedToDate: Date = new Date();

  model: ReportTripPassengerSheetModel[];

  constructor(
    public utilityService: UtilityService,
    private passengerService: PassengerService,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.passengerService.getDropdownList('')
      .subscribe(
        (list: DropdownItem<string>[]) => {
          this.passengerList = list;
          this.handlePassengerValueChange(this.passengerList[0]);
        });
  }

  handlePassengerValueChange(value: DropdownItem<string>): void {
    this.selectedPassenger = value;
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
    this.reportService.getTripPassengerSheetModel(
      this.selectedPassenger.value,
      this.selectedDate,
      this.selectedToDate,
    )
      .subscribe(
        (model: ReportTripPassengerSheetModel[]) => {
          this.model = model;
        }
      );
  }

  exportToExcel(): void {
    this.reportService.getTripPassengerSheetExcel(
      this.selectedPassenger.value,
      this.selectedDate,
      this.selectedToDate,
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
    a.download = 'Passenger Sheet - (' +
      this.selectedPassenger?.text +
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
