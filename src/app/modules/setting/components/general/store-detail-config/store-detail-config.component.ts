import { UtilityRix } from 'src/app/helper/common/utility_rix';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { AddressTemplate } from './../../../../../helper/models/common/address-template';
import { PhoneTemplate } from './../../../../../helper/models/common/phone-template';
import { LocationService } from './../../../../../helper/services/config/location.service';
import { CommonService } from './../../../../../helper/services/common/common.service';
import { AlertService } from 'src/app/helper/services/alert.service';
import { UtilityService } from 'src/app/helper/services/utility.service';
import { DropdownItem } from './../../../../../helper/models/common/dropdown-item.model';
import { LocationDetailModel } from './../../../../../helper/models/settings/general/location-detail-model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, FormControlName, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownType } from 'src/app/helper/common/shared_types';

@Component({
  selector: 'app-store-detail-config',
  templateUrl: './store-detail-config.component.html',
  styleUrls: ['./store-detail-config.component.css']
})
export class StoreDetailConfigComponent implements OnInit {

  model: LocationDetailModel;
  form: UntypedFormGroup;

  countryCodeList: DropdownItem<string>[];

  businessLogoFile: File;
  @ViewChild('inputBusinessLogo') inputBusinessLogo: ElementRef;

  constructor(
    private el: ElementRef,
    private notificationService: NotificationService,
    public utilityService: UtilityService,
    private alertService: AlertService,
    private commonService: CommonService,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.locationService.getSelectedLocation()
      .subscribe(
        (location: DropdownItem<string>) => {
          if (!location) {
            return;
          }

          this.locationService.getLocationDetail(location.value)
            .subscribe((model: LocationDetailModel) => {
              this.model = model;
              this.initForm();
            });

        }
      );

    this.commonService.getDropdownList(DropdownType.CountryDialCodes, '')
      .subscribe(
        (list: DropdownItem<string>[]) => {
          this.countryCodeList = list;

        }
      );

  }

  private initForm(): void {

    let id = '';
    let name = '';
    let email = '';
    let phone: PhoneTemplate = null;
    let address: AddressTemplate = null;

    if (this.model) {

      id = this.model.id;
      name = this.model.name;
      email = this.model.email;
      phone = this.model.phone;
      address = this.model.address;

    }

    this.form = new UntypedFormGroup({

      id: new UntypedFormControl(id),
      name: new UntypedFormControl(
        name,
        [
          Validators.required
        ]),
      email: new UntypedFormControl(email),
      phone: new UntypedFormGroup(
        {
          countryCode: new UntypedFormControl(phone.countryCode ? phone.countryCode : {
            text: '+92',
            value: '+92'
          }),
          phoneNumber: new UntypedFormControl(phone.phoneNumber),
        }
      ),
      address: new UntypedFormGroup(
        {
          primaryAddress: new UntypedFormControl(address.primaryAddress),
          address2: new UntypedFormControl(address.address2),
        }
      )

    });

  }

  submit(): void {
    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    this.model = this.form.value;

    this.locationService.updateLocationDetail(
      this.locationService.prepareSaveLocationDetail(
        this.model,
        this.businessLogoFile))
      .subscribe(
        (response: ResponseModel) => {
          if (response.hasError) {
            this.alertService.setErrorAlert(response.msg);
            return;
          }
          this.notificationService.show(
            UtilityRix.getSuccsessNotification('Location detail updated successfully'));
          this.ngOnInit();
        }
      );
  }

  handleLocationLogoInput(files: FileList): void {
    this.businessLogoFile = files.item(0);
    const reader: any = new FileReader();
    reader.readAsDataURL(this.businessLogoFile);
    reader.onload = (e: any) => {
      // this.base64Data = reader.result.split(',').pop();
      const image = new Image();
      image.src = e.target.result;
      image.onload = (rs) => {
        const width = rs.currentTarget['width'];
        const height = rs.currentTarget['height'];
        const dimensions = {
          width,
          height,
        };

        if (this.businessLogoFile.size > 1000000
          || dimensions.width > 152
          || dimensions.height > 80) {
          this.alertService.setErrorAlert(
            'File format .JPG or .PNG, max file size 1 MB and dimensions 80px X 152px.');
          this.businessLogoFile = null;
          this.inputBusinessLogo.nativeElement.value = '';
        }
        // this.productCategoryAddForm.patchValue({ product_category_image: dimensions });
      };
    };
  }

}
