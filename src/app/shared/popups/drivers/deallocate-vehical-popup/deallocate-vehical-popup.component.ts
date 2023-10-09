import { ResponseModel } from './../../../../helper/models/common/response-model';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { AlertService } from './../../../../helper/services/common/alert.service';
import { CommonService } from './../../../../helper/services/common/common.service';
import { DriverService } from './../../../../helper/services/drivers/driver.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { AllocateVehicalModel } from './../../../../helper/models/drivers/allocate-vehical-model';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-deallocate-vehical-popup',
  templateUrl: './deallocate-vehical-popup.component.html',
  styleUrls: ['./deallocate-vehical-popup.component.css']
})
export class DeallocateVehicalPopupComponent implements OnInit {
  @Input() driverId: string;
  form: UntypedFormGroup;
  model: AllocateVehicalModel;

  constructor(
    public utilityService: UtilityService,
    private driverService: DriverService,
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

  }

  private initForm(): void {
    this.form = new UntypedFormGroup({
      vehical: new UntypedFormControl(
        this.model.vehical
      ),
      notes: new UntypedFormControl(null)
    });
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }
    this.model = this.form.value;
    this.model.id = this.driverId;
    this.driverService.deallocateVehical(this.model)
      .subscribe((response: ResponseModel<string>) => {
        if (response.hasError) {
          this.alertService.setErrorAlert(response.msg);
          return;
        }
        this.driverService.setDeallocateVehicalPopup(false);
      });
  }

  close(): void {
    this.driverService.setDeallocateVehicalPopup(false);
  }


}
