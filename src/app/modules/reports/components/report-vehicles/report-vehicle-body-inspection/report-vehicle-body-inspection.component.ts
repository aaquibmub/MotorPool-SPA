import { HttpResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ReportVehicleBodyInspectionModel } from 'src/app/helper/models/reports/vehicles/inspections/report-vehicle-body-inspection-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { ReportService } from 'src/app/helper/services/utilities/report.service';
import { VehicalService } from 'src/app/helper/services/vehicals/vehical.service';

@Component({
  selector: 'app-report-vehicle-body-inspection',
  templateUrl: './report-vehicle-body-inspection.component.html',
  styleUrls: ['./report-vehicle-body-inspection.component.scss']
})
export class ReportVehicleBodyInspectionComponent implements OnInit {
  backSideOverlay: any;
  leftSideOverlay: any;
  rightSideOverlay: any;
  frontSideOverlay: any;
  roofSideOverlay: any;
  printTop = 315;
  printLeft = 305;
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    debugger;
    // this.positionOverlays();
  }

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

          // this.positionOverlays();

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

  setImageMapperStyle(image?: string): void {
    if (image == 'back') {
      let backImage = $('#back')[0] as any;
      if (backImage) {
        this.backSideOverlay = {
          top: `${backImage.offsetTop}px`,
          bottom: 0,
          right: 0,
          left: `${backImage.offsetLeft}px`,
        };
      }
    }
    if (image == 'left') {
      let leftImage = $('#left')[0] as any;
      if (leftImage) {
        this.leftSideOverlay = {
          top: `${leftImage.offsetTop}px`,
          bottom: 0,
          right: 0,
          left: `${leftImage.offsetLeft}px`,
        };
      }
    }
    if (image == 'right') {
      let rightImage = $('#right')[0] as any;
      if (rightImage) {
        this.rightSideOverlay = {
          top: `${rightImage.offsetTop}px`,
          bottom: 0,
          right: 0,
          left: `${rightImage.offsetLeft}px`,
        };
      }
    }
    if (image == 'front') {
      let frontImage = $('#front')[0] as any;
      if (frontImage) {
        this.frontSideOverlay = {
          top: `${frontImage.offsetTop}px`,
          bottom: 0,
          right: 0,
          left: `${frontImage.offsetLeft}px`,
        }
      }
    }
    if (image == 'roof') {
      let roofImage = $('#roof')[0] as any;
      if (roofImage) {
        this.roofSideOverlay = {
          top: `${roofImage.offsetTop}px`,
          bottom: 0,
          right: 0,
          left: `${roofImage.offsetLeft}px`,
        };
      }
    }
  }

  getCoordinateStyle(coordinate: any): object {
    return {
      top: `${coordinate.yaxis}px`,
      left: `${coordinate.xaxis}px`,
      background: `${coordinate.hexColor ?? '#000'}`,
      height: `5px`,
      width: `5px`
    };
  }

  positionOverlays(): void {

    setTimeout(() => {
      this.setImageMapperStyle('back');
      this.setImageMapperStyle('left');
      this.setImageMapperStyle('right');
      this.setImageMapperStyle('front');
      this.setImageMapperStyle('roof');
    }, 2000);
  }

  getNumberWithoutPx(str: string): number {
    if (str) {
      const numPart = str.substring(0, str.length - 2);
      return +numPart;
    }
    return 0;
  }

}
