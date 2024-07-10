import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { VehicalService } from 'src/app/helper/services/vehicals/vehical.service';

@Component({
  selector: 'app-vehicle-odo-meter',
  templateUrl: './vehicle-odo-meter.component.html',
  styleUrls: ['./vehicle-odo-meter.component.css']
})
export class VehicleOdoMeterComponent implements OnInit {
  pageTitle: string;

  constructor(
    public utilityService: UtilityService,
    private vehicleService: VehicalService) {
    this.pageTitle = 'ODO Meter History';
  }

  handleCreateNewButtonClick(): void {
    this.vehicleService.setUpdateOdoMeterPopup(true);
  }

  ngOnInit(): void {
  }

}
