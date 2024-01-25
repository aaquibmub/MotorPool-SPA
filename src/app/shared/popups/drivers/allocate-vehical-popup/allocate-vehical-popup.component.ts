import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { ResponseModel } from './../../../../helper/models/common/response-model';
import { AllocateVehicalModel } from './../../../../helper/models/drivers/allocate-vehical-model';
import { VehicalModel } from './../../../../helper/models/vehicals/vehical-model';
import { AlertService } from './../../../../helper/services/common/alert.service';
import { CommonService } from './../../../../helper/services/common/common.service';
import { DriverService } from './../../../../helper/services/drivers/driver.service';
import { VehicalService } from './../../../../helper/services/vehicals/vehical.service';

@Component({
  selector: 'app-allocate-vehical-popup',
  templateUrl: './allocate-vehical-popup.component.html',
  styleUrls: ['./allocate-vehical-popup.component.css']
})
export class AllocateVehicalPopupComponent implements OnInit {
  @Input() driverId: string;
  form: UntypedFormGroup;
  model: AllocateVehicalModel;

  vehicalList: VehicalModel[];

  constructor(
    public utilityService: UtilityService,
    private driverService: DriverService,
    private vehicalService: VehicalService,
    private commonService: CommonService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.driverService.getAllocateVehicalModel(this.driverId)
      .subscribe(
        (model: AllocateVehicalModel) => {
          this.model = model;

          this.initForm();
        }
      );

    this.vehicalService.getTableList('')
      .subscribe((list: VehicalModel[]) => {
        this.vehicalList = list;
      });
  }

  private initForm(): void {
    this.form = new UntypedFormGroup({
      vehicals: new UntypedFormControl(this.model.vehicals),
      notes: new UntypedFormControl(null)
    });
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }
    this.model = this.form.value;
    this.model.id = this.driverId;
    this.driverService.allocateVehical(this.model)
      .subscribe((response: ResponseModel<string>) => {
        if (response.hasError) {
          this.alertService.setErrorAlert(response.msg);
          return;
        }
        this.driverService.setAllocateVehicalPopup(false);
      });
  }

  close(): void {
    this.driverService.setAllocateVehicalPopup(false);
  }


}
