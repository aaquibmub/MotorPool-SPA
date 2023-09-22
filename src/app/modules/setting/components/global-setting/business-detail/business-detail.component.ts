import { StoreLevelConfig } from './../../../../../helper/models/common/store-level-config';
import { CommonService } from './../../../../../helper/services/common/common.service';
import { DropdownItem } from './../../../../../helper/models/common/dropdown-item.model';
import { UtilityRix } from 'src/app/helper/common/utility_rix';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { AddressTemplate } from './../../../../../helper/models/common/address-template';
import { PhoneTemplate } from './../../../../../helper/models/common/phone-template';
import { StoreService } from './../../../../../helper/services/account/store.service';
import { AlertService } from 'src/app/helper/services/alert.service';
import { UtilityService } from 'src/app/helper/services/utility.service';
import { BusinessDetailModel } from './../../../../../helper/models/settings/global/business-detail-model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownType } from 'src/app/helper/common/shared_types';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.css']
})
export class BusinessDetailComponent implements OnInit {

  model: BusinessDetailModel;
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
    private storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.storeService.getBusinessDetail()
      .subscribe((model: BusinessDetailModel) => {
        this.model = model;
        this.initForm();
      });

    this.commonService.getDropdownList(DropdownType.CountryDialCodes, '')
      .subscribe(
        (list: DropdownItem<string>[]) => {
          this.countryCodeList = list;

        }
      );

  }

  private initForm(): void {

    let name = '';
    let ownerName = '';
    let email = '';
    let website = '';
    let ownerPhone: PhoneTemplate = null;
    let address: AddressTemplate = null;
    let logo: StoreLevelConfig = null;

    if (this.model) {

      name = this.model.name;
      ownerName = this.model.ownerName;
      email = this.model.email;
      website = this.model.website;
      ownerPhone = this.model.ownerPhone;
      address = this.model.address;
      logo = this.model.logo;

    }

    this.form = new UntypedFormGroup({

      name: new UntypedFormControl(
        name,
        [
          Validators.required
        ]),
      ownerName: new UntypedFormControl(ownerName, [Validators.required]),
      email: new UntypedFormControl(email),
      website: new UntypedFormControl(website),
      ownerPhone: new UntypedFormGroup(
        {
          countryCode: new UntypedFormControl(ownerPhone.countryCode ? ownerPhone.countryCode : {
            text: '+92',
            value: '+92'
          }),
          phoneNumber: new UntypedFormControl(ownerPhone.phoneNumber),
        }
      ),
      address: new UntypedFormGroup(
        {
          primaryAddress: new UntypedFormControl(address.primaryAddress),
          address2: new UntypedFormControl(address.address2),
        }
      ),
      logo: new UntypedFormGroup(
        {
          logo: new UntypedFormControl(logo.logo)
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

    this.storeService.updateBusinessDetail(
      this.storeService.prepareSaveBusinessDetail(
        this.model,
        this.businessLogoFile))
      .subscribe(
        (response: ResponseModel) => {
          if (response.hasError) {
            this.alertService.setErrorAlert(response.msg);
            return;
          }
          this.notificationService.show(
            UtilityRix.getSuccsessNotification('Business detail updated successfully'));
          this.ngOnInit();
        }
      );
  }

  handleBusinessLogoInput(files: FileList): void {
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
