import { guid } from '@progress/kendo-angular-common';
import { UtilityRix } from './../../../../../helper/common/utility_rix';
import { ResponseModel } from './../../../../../helper/models/common/response-model';
import { TaxRateService } from './../../../../../helper/services/config/tax-rate.service';
import { AlertService } from './../../../../../helper/services/alert.service';
import { UtilityService } from './../../../../../helper/services/utility.service';
import { TaxRateConfig } from './../../../../../helper/models/config/tax-rate/tax-rate-config';
import { TaxRateConfigModel } from '../../../../../helper/models/config/tax-rate/tax-rate-config-model';
import { Component, ElementRef, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-tax-rate-list',
  templateUrl: './tax-rate-list.component.html',
  styleUrls: ['./tax-rate-list.component.css']
})
export class TaxRateListComponent implements OnInit {

  form: UntypedFormGroup;
  model: TaxRateConfigModel;

  list: TaxRateConfig[];

  constructor(
    private el: ElementRef,
    private utilityService: UtilityService,
    private notificationService: NotificationService,
    private alertService: AlertService,
    private taxRateService: TaxRateService
  ) { }

  ngOnInit(): void {

    this.taxRateService.getTaxRateConfigModel()
      .subscribe(
        (model: TaxRateConfigModel) => {
          this.list = model.taxRates;
          this.initForm();
        }
      );
  }

  private initForm(): void {
    const taxRates = [];

    if (this.list) {
      this.list.forEach(f => {
        taxRates.push(this.utilityService.createTaxRateConfigFormGroup(f));
      });
    }

    this.form = new UntypedFormGroup({

      taxRates: new UntypedFormArray(taxRates)

    });

  }

  addNewTaxRate(): void {
    (this.form.get('taxRates') as UntypedFormArray).push(this.utilityService.createTaxRateConfigFormGroup({
      id: guid(),
      name: '',
      taxRate: 0
    }));
  }

  submit(): void {
    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    this.model = this.form.value;

    this.taxRateService.updateTaxRateConfig(this.model)
      .subscribe(
        (response: ResponseModel) => {
          if (response.hasError) {
            this.alertService.setErrorAlert(response.msg);
            return;
          }
          this.notificationService.show(
            UtilityRix.getSuccsessNotification('Tax rates updated successfully'));
          this.ngOnInit();
        }
      );
  }

}
