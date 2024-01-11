import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AddressModel } from 'src/app/helper/models/address/address-model';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { AddressService } from 'src/app/helper/services/address/address.service';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';

@Component({
  selector: 'app-address-quick-add-popup',
  templateUrl: './address-quick-add-popup.component.html',
  styleUrls: ['./address-quick-add-popup.component.css']
})
export class AddressQuickAddPopupComponent implements OnInit {
  @Input() arg: any;

  form: UntypedFormGroup;
  model: AddressModel;

  constructor(
    private el: ElementRef,
    public utilityService: UtilityService,
    private addressService: AddressService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = new UntypedFormGroup({
      address: new UntypedFormControl('', [Validators.required]),
    });
  }

  submit(): void {
    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }
    this.model = this.form.value;
    this.model.status = true;
    this.addressService.addUpdate(this.model)
      .subscribe((response: ResponseModel<string>) => {
        if (response.hasError) {
          this.alertService.setErrorAlert(response.msg);
          return;
        }
        this.addressService.setQuickAddPopup({ show: false, arg: this.arg, item: new DropdownItem<string>(this.model.address, response.result) });
      });
  }

  close(): void {
    this.addressService.setQuickAddPopup({ show: false, arg: this.arg, item: null });
  }


}
