import { Component, OnInit } from '@angular/core';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ReportVehicleGeneralInspectionByDateModel } from 'src/app/helper/models/reports/vehicles/inspections/general/report-vehicle-general-inspection-by-date-model';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { ReportService } from 'src/app/helper/services/utilities/report.service';
import { VehicalService } from 'src/app/helper/services/vehicals/vehical.service';

@Component({
  selector: 'app-report-vehicle-general-inspection-by-date',
  templateUrl: './report-vehicle-general-inspection-by-date.component.html',
  styleUrls: ['./report-vehicle-general-inspection-by-date.component.css']
})
export class ReportVehicleGeneralInspectionByDateComponent implements OnInit {
  printTop = 315;
  printLeft = 305;
  selectedVehicle: DropdownItem<string>;
  vehicleList: DropdownItem<string>[];

  selectedDate: Date = new Date();
  selectedToDate: Date = new Date();

  model: ReportVehicleGeneralInspectionByDateModel[];
  itemsList: string[] = [];

  constructor(
    public utilityService: UtilityService,
    private alertService: AlertService,
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

  handleToDateValueChange(value: Date): void {
    this.selectedToDate = value;
    this.fetchReport();
  }

  fetchReport(): void {

    if (this.selectedVehicle == null || this.selectedVehicle == undefined
      || this.selectedVehicle.value == null || this.selectedVehicle.value == undefined
      || this.selectedVehicle.value == ''
    ) {
      this.model = null;
      this.itemsList = [];
      this.alertService.setErrorAlert('Please select a vehicle');
      return;
    }

    this.reportService.getVehicleGeneralInspectionByDateModel(
      this.selectedDate,
      this.selectedToDate,
      this.selectedVehicle?.value,
    )
      .subscribe(
        (model: ReportVehicleGeneralInspectionByDateModel[]) => {
          this.model = model;
          this.itemsList = [];
          this.model.forEach(f => {
            if (f.items != null) {
              f.items.forEach(i => {
                if (this.itemsList.indexOf(i.item) == -1) {
                  this.itemsList.push(i.item);
                }
              });
              return;
            }
          });
        }
      );
  }

}
