import { UtilityService } from './../../../../../helper/services/utility.service';
import { StoreTaxRateConfigModel } from './../../../../../helper/models/config/tax-rate/store-tax-rate-config-model';
import { Component, ElementRef, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { AlertService } from './../../../../../helper/services/alert.service';
import { TaxRateService } from './../../../../../helper/services/config/tax-rate.service';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { UtilityRix } from 'src/app/helper/common/utility_rix';
import { DropdownItem } from 'src/app/helper/models/common/dropdown-item.model';
import { CommonService } from 'src/app/helper/services/common/common.service';
import { DropdownType } from 'src/app/helper/common/shared_types';

@Component({
  selector: 'app-tax-rate-setting',
  templateUrl: './tax-rate-setting.component.html',
  styleUrls: ['./tax-rate-setting.component.css']
})
export class TaxRateSettingComponent implements OnInit {

  form: UntypedFormGroup;
  model: StoreTaxRateConfigModel;

  saleTaxRateList: DropdownItem<string>[];
  purchaseTaxRateList: DropdownItem<string>[];

  constructor(
    private el: ElementRef,
    public utilityService: UtilityService,
    private notificationService: NotificationService,
    private alertService: AlertService,
    private commonService: CommonService,
    private taxRateService: TaxRateService
  ) { }

  ngOnInit(): void {

    this.taxRateService.getStoreTaxRateConfigModel()
      .subscribe(
        (model: StoreTaxRateConfigModel) => {
          this.model = model;
          this.initForm();
        }
      );

    this.commonService.getDropdownList(DropdownType.SaleTaxRate, '')
      .subscribe(
        (list: DropdownItem<string>[]) => {
          this.saleTaxRateList = list;
        }
      );

    this.commonService.getDropdownList(DropdownType.PurchaseTaxRate, '')
      .subscribe(
        (list: DropdownItem<string>[]) => {
          this.purchaseTaxRateList = list;
        }
      );
  }

  private initForm(): void {

    let enableTax = false;
    let saleTaxRate = null;
    let purchaseTaxRate = null;

    if (this.model) {

      enableTax = this.model.enableTax;
      saleTaxRate = this.model.saleTaxRate;
      purchaseTaxRate = this.model.purchaseTaxRate;

    }

    this.form = new UntypedFormGroup({

      enableTax: new UntypedFormControl(enableTax),
      saleTaxRate: new UntypedFormControl(saleTaxRate),
      purchaseTaxRate: new UntypedFormControl(purchaseTaxRate)

    });

  }

  submit(): void {
    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    this.model = this.form.value;

    this.taxRateService.updateStoreTaxRateConfig(this.model)
      .subscribe(
        (response: ResponseModel) => {
          if (response.hasError) {
            this.alertService.setErrorAlert(response.msg);
            return;
          }
          this.notificationService.show(
            UtilityRix.getSuccsessNotification('Taxes updated successfully'));
          this.ngOnInit();
        }
      );
  }

}
