import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { VehicleOdoMeterHistoryModel } from 'src/app/helper/models/vehicals/odo-meter-history/vehicle-odo-meter-history-model';
import { VehicalModel } from 'src/app/helper/models/vehicals/vehical-model';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { CommonService } from 'src/app/helper/services/common/common.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { VehicalService } from 'src/app/helper/services/vehicals/vehical.service';

@Component({
  selector: 'app-update-odo-meter-popup',
  templateUrl: './update-odo-meter-popup.component.html',
  styleUrls: ['./update-odo-meter-popup.component.css']
})
export class UpdateOdoMeterPopupComponent implements OnInit {
  form: UntypedFormGroup;
  model: VehicleOdoMeterHistoryModel;

  vehicalList: VehicalModel[];

  constructor(
    public utilityService: UtilityService,
    private vehicalService: VehicalService,
    private commonService: CommonService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.vehicalService.getTableList('')
      .subscribe((list: VehicalModel[]) => {
        this.vehicalList = list;
      });

    this.initForm();
  }

  private initForm(): void {
    this.form = new UntypedFormGroup({
      vehicle: new UntypedFormControl(null, [UtilityRix.dropdownRequired as ValidatorFn]),
      odoMeter: new UntypedFormControl(null, [Validators.required]),
      comments: new UntypedFormControl(null, [Validators.required])
    });
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }
    this.model = this.form.value;
    this.vehicalService.updateOdoMeter(this.model)
      .subscribe((response: ResponseModel<string>) => {
        if (response.hasError) {
          this.alertService.setErrorAlert(response.msg);
          return;
        }
        this.vehicalService.setUpdateOdoMeterPopup(false);
      });
  }

  close(): void {
    this.vehicalService.setUpdateOdoMeterPopup(false);
  }

  handleVehicleFilter(text: string): void {

    this.vehicalService.getTableList(text)
      .subscribe((list: VehicalModel[]) => {
        this.vehicalList = list;
      });
  }


}
