import { Component, OnInit } from '@angular/core';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ReportTripDriverSheetModel } from 'src/app/helper/models/reports/trips/driver-sheet/report-trip-driver-sheet-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { DriverService } from 'src/app/helper/services/drivers/driver.service';
import { ReportService } from 'src/app/helper/services/utilities/report.service';

@Component({
  selector: 'app-report-trips-driver-sheet',
  templateUrl: './report-trips-driver-sheet.component.html',
  styleUrls: ['./report-trips-driver-sheet.component.css']
})
export class ReportTripsDriverSheetComponent implements OnInit {
  selectedDriver: DropdownItem<string>;
  driverList: DropdownItem<string>[];

  selectedDate: Date = new Date();

  model: ReportTripDriverSheetModel;

  constructor(
    public utilityService: UtilityService,
    private driverService: DriverService,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.driverService.getDropdownList('')
      .subscribe(
        (list: DropdownItem<string>[]) => {
          this.driverList = list;
          this.handleDriverValueChange(this.driverList[0]);
        });
  }

  handleDriverValueChange(value: DropdownItem<string>): void {
    this.selectedDriver = value;
    this.fetchReport();
  }

  handleDateValueChange(value: Date): void {
    this.selectedDate = value;
    this.fetchReport();
  }

  fetchReport(): void {
    this.reportService.getTripDriverSheetModel(
      this.selectedDriver.value,
      this.selectedDate,
    )
      .subscribe(
        (model: ReportTripDriverSheetModel) => {
          this.model = model;
          debugger;
        }
      );
  }

}
