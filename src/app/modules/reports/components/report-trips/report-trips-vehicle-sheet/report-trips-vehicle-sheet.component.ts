import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ReportTripVehicleSheetModel } from 'src/app/helper/models/reports/trips/vehicle-sheet/report-trip-vehicle-sheet-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { ReportService } from 'src/app/helper/services/utilities/report.service';
import { VehicalService } from 'src/app/helper/services/vehicals/vehical.service';

@Component({
  selector: 'app-report-trips-vehicle-sheet',
  templateUrl: './report-trips-vehicle-sheet.component.html',
  styleUrls: ['./report-trips-vehicle-sheet.component.css']
})
export class ReportTripsVehicleSheetComponent implements OnInit {
  selectedVehicle: DropdownItem<string>;
  vehicleList: DropdownItem<string>[];

  selectedDate: Date = new Date();

  model: ReportTripVehicleSheetModel;

  constructor(
    public utilityService: UtilityService,
    private vehicleService: VehicalService,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.vehicleService.getDropdownList('')
      .subscribe(
        (list: DropdownItem<string>[]) => {
          this.vehicleList = list;
          this.handleVehicleValueChange(this.vehicleList[0]);
        });
  }

  handleVehicleValueChange(value: DropdownItem<string>): void {
    this.selectedVehicle = value;
    this.fetchReport();
  }

  handleDateValueChange(value: Date): void {
    this.selectedDate = value;
    this.fetchReport();
  }

  fetchReport(): void {
    this.reportService.getTripVehicleSheetModel(
      this.selectedVehicle?.value,
      this.selectedDate,
    )
      .subscribe(
        (model: ReportTripVehicleSheetModel) => {
          this.model = model;
        }
      );
  }

  exportToExcel(): void {
    this.reportService.getTripVehicleSheetExcel(
      this.selectedVehicle.value,
      this.selectedDate,
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
    a.download = 'Vehicle Sheet - (' +
      this.model?.vehicleId +
      '-' +
      this.selectedDate.toDateString().toString() +
      ').xlsx';
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }

}
