import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ReportVehicleBodyInspectionModel } from 'src/app/helper/models/reports/vehicles/inspections/report-vehicle-body-inspection-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { ReportService } from 'src/app/helper/services/utilities/report.service';
import { VehicalService } from 'src/app/helper/services/vehicals/vehical.service';

@Component({
  selector: 'app-report-vehicle-body-inspection',
  templateUrl: './report-vehicle-body-inspection.component.html',
  styleUrls: ['./report-vehicle-body-inspection.component.css']
})
export class ReportVehicleBodyInspectionComponent implements OnInit {
  side = UtilityRix.bodyInspectionSide;
  selectedVehicle: DropdownItem<string>;
  vehicleList: DropdownItem<string>[];

  selectedDate: Date = new Date();

  model: ReportVehicleBodyInspectionModel[];

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
    this.reportService.getVehicleBodyInspectionModel(
      this.selectedDate,
      this.selectedVehicle?.value,
    )
      .subscribe(
        (model: ReportVehicleBodyInspectionModel[]) => {
          this.model = model;
        }
      );
  }

  private downloadFile = (data: HttpResponse<Blob>) => {
    const downloadedFile = new Blob([data.body as BlobPart], { type: data.body?.type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = 'Vehicle Body Inspection - (' +
      this.selectedVehicle?.text +
      '-' +
      this.selectedDate.toDateString().toString() +
      ').xlsx';
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }

}
