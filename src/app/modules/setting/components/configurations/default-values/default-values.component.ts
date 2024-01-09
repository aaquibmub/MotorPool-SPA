import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { CommonService } from 'src/app/helper/services/common/common.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { ApproverService } from 'src/app/helper/services/trips/approver.service';
import { AddressService } from 'src/app/helper/services/utilities/address.service';
import { DefaultValueConfigModel } from './../../../../../helper/models/settings/config/default-values/default-value-config-model';
import { ConfigService } from './../../../../../helper/services/common/config.service';

@Component({
  selector: 'app-default-values',
  templateUrl: './default-values.component.html',
  styleUrls: ['./default-values.component.css']
})
export class DefaultValuesComponent implements OnInit {

  model: DefaultValueConfigModel;
  form: FormGroup;

  approverList: DropdownItem<string>[];
  startingPointList: DropdownItem<string>[];
  dropoffList: DropdownItem<string>[];

  constructor(
    private el: ElementRef,
    private notificationService: NotificationService,
    public utilityService: UtilityService,
    private alertService: AlertService,
    private commonService: CommonService,
    private configService: ConfigService,
    private approverService: ApproverService,
    private addressService: AddressService,
  ) { }

  ngOnInit(): void {

    this.configService.getDefaultValueConfigModel()
      .subscribe((model: DefaultValueConfigModel) => {
        this.model = model;
        this.initForm();
      });

    this.approverService.getDropdownList('')
      .subscribe(
        (list: DropdownItem<string>[]) => {
          this.approverList = list;
        }
      );

    this.addressService.getDropdownList('')
      .subscribe(
        (list: DropdownItem<string>[]) => {
          this.startingPointList = list;
          this.dropoffList = list;
        }
      );

  }

  private initForm(): void {

    let approver = null;
    let startingPoint = null;
    let dropoff = null;

    if (this.model) {

      approver = this.model.approver;
      startingPoint = this.model.startingPoint;
      dropoff = this.model.dropoff;

    }

    this.form = new FormGroup({

      approver: new FormControl(
        approver,
        [
          UtilityRix.dropdownRequired as ValidatorFn
        ]),
      startingPoint: new FormControl(
        startingPoint,
        [
          UtilityRix.dropdownRequired as ValidatorFn
        ]),
      dropoff: new FormControl(
        dropoff,
        [
          UtilityRix.dropdownRequired as ValidatorFn
        ]),
    });

  }

  submit(): void {
    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    this.model = this.form.value;
    this.configService.updateDefaultValueConfig(this.model)
      .subscribe(
        (response: ResponseModel<string>) => {
          if (response.hasError) {
            this.alertService.setErrorAlert(response.msg);
            return;
          }
          this.notificationService.show(
            UtilityRix.getSuccsessNotification('Default value updated successfully'));
          this.ngOnInit();
        }
      );
  }

  handleApproverFilter(value): void {
    this.approverService.getDropdownList(value)
      .subscribe((list: DropdownItem<string>[]) => {
        this.approverList = list;
      });
  }

  handleStartingPointFilter(value): void {
    this.addressService.getDropdownList(value)
      .subscribe((list: DropdownItem<string>[]) => {
        this.startingPointList = list;
      });
  }

  handleDropoffFilter(value): void {
    this.addressService.getDropdownList(value)
      .subscribe((list: DropdownItem<string>[]) => {
        this.dropoffList = list;
      });
  }

}
