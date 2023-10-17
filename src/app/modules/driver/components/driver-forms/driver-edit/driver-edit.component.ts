import { Component, OnInit } from '@angular/core';
import { DriverModel } from 'src/app/helper/models/drivers/driver-model';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import {DropdownItem} from "../../../../../helper/models/common/dropdown/dropdown-item.model";
import { VehicalTypeService } from 'src/app/helper/services/vehicals/vehical-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import {CommonService} from "../../../../../helper/services/common/common.service";

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.css']
})
export class DriverEditComponent implements OnInit {

  model: DriverModel;
  form: UntypedFormGroup;
  nationalityList: DropdownItem<string>[];
  countryList: DropdownItem<string>[];

  editMode = false;
  constructor(
    private driverNationalityService: VehicalTypeService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.params
      .subscribe(() => {
          this.initForm();
      });

    this.driverNationalityService.getDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.nationalityList = list;
      });

    this.commonService.getCountryDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.countryList = list;
      });
  }

  private initForm(): void {

    let driverFirstName: string = '';
    let driverMiddleName: string = '';
    let driverLastName: string = '';
    let driverIdNumber: string = '';
    let driverNationality: DropdownItem<string>;
    let driverMobileNumber: string = '';
    let driverEmailAddress: string = '';

    if (this.model) {
      driverFirstName = this.model.firstName;
      driverMiddleName = this.model.middleName;
      driverLastName = this.model.lastName;
      driverNationality = this.model.nationality;
      driverIdNumber = this.model.idNumber;
      driverMobileNumber = this.model.mobileNumber;
      driverEmailAddress = this.model.emailAddress;
    }

    this.form = new UntypedFormGroup({
      driverFirstName: new UntypedFormControl(
        driverFirstName, [Validators.required]),
      driverMiddleName: new UntypedFormControl(
        driverMiddleName, [Validators.required]),
      driverLastName: new UntypedFormControl(
        driverLastName, [Validators.required]),
      driverNationality: new UntypedFormControl(
        driverNationality, [Validators.required]),
      driverIdNumber: new UntypedFormControl(
        driverIdNumber, [Validators.required]),
      driverMobileNumber: new UntypedFormControl(
        driverMobileNumber, [Validators.required]),
      driverEmailAddress: new UntypedFormControl(
        driverEmailAddress, [Validators.required]),
    });

  }

  cancel(): void {
    this.router.navigate(['/drivers/pool/all/']);
  }

  submit(): void {
  }


}
