import { ResponseModel } from './../../../../helper/models/common/response-model';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { VehicalService } from './../../../../helper/services/vehicals/vehical.service';
import { AlertService } from './../../../../helper/services/common/alert.service';
import { CommonService } from './../../../../helper/services/common/common.service';
import { DriverService } from './../../../../helper/services/drivers/driver.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { AllocateVehicalModel } from './../../../../helper/models/drivers/allocate-vehical-model';
import { DropdownItem } from './../../../../helper/models/common/dropdown/dropdown-item.model';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-allocate-vehical-popup',
  templateUrl: './allocate-vehical-popup.component.html',
  styleUrls: ['./allocate-vehical-popup.component.css']
})
export class AllocateVehicalPopupComponent implements OnInit {
  @Input() driverId: string;
  form: UntypedFormGroup;
  model: AllocateVehicalModel;

  vehicalList: DropdownItem<string>[];

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

    this.driverService.getDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.vehicalList = list;
      });
  }

  private initForm(): void {
    this.form = new UntypedFormGroup({
      vehical: new UntypedFormControl(
        this.model.vehical, [UtilityRix.dropdownRequired as ValidatorFn]
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
