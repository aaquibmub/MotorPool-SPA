import { Component, OnInit } from '@angular/core';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ReportVehicleGeneralInspectionByVehicleModel } from 'src/app/helper/models/reports/vehicles/inspections/general/report-vehicle-general-inspection-by-vehicle-model';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { ReportService } from 'src/app/helper/services/utilities/report.service';
import { VehicalService } from 'src/app/helper/services/vehicals/vehical.service';

@Component({
  selector: 'app-report-vehicle-general-inspection-by-vehicle',
  templateUrl: './report-vehicle-general-inspection-by-vehicle.component.html',
  styleUrls: ['./report-vehicle-general-inspection-by-vehicle.component.css']
})
export class ReportVehicleGeneralInspectionByVehicleComponent implements OnInit {
  printTop = 315;
  printLeft = 305;
  selectedVehicle: DropdownItem<string>[] = [];
  vehicleList: DropdownItem<string>[];

  selectedDate: Date = new Date();

  model: ReportVehicleGeneralInspectionByVehicleModel[];
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
          this.handleVehicleValueChange([this.vehicleList[0]]);
        });
  }

  handleVehicleValueChange(value: DropdownItem<string>[]): void {
    this.selectedVehicle = value;
    this.fetchReport();
  }

  handleDateValueChange(value: Date): void {
    this.selectedDate = value;
    this.fetchReport();
  }

  fetchReport(): void {

    if (this.selectedVehicle == null || this.selectedVehicle == undefined
      || this.selectedVehicle.length == 0
    ) {
      this.model = null;
      this.itemsList = [];
      this.alertService.setErrorAlert('Please select a vehicle');
      return;
    }

    var vehicleIds = this.selectedVehicle.map(m => m.value);

    this.reportService.getVehicleGeneralInspectionByVehicleModel(
      this.selectedDate,
      vehicleIds,
    )
      .subscribe(
        (model: ReportVehicleGeneralInspectionByVehicleModel[]) => {
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
