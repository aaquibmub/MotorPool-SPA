import { timezoneNames } from '@progress/kendo-date-math';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { UtilityRix } from 'src/app/helper/common/utility_rix';
import { LocationService } from './../../../../../helper/services/config/location.service';
import { CommonService } from './../../../../../helper/services/common/common.service';
import { AlertService } from 'src/app/helper/services/alert.service';
import { UtilityService } from 'src/app/helper/services/utility.service';
import { DropdownItem } from './../../../../../helper/models/common/dropdown-item.model';
import { LocationConfigModel } from './../../../../../helper/models/settings/general/location/location-config-model';
import { Component, ElementRef, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownType } from 'src/app/helper/common/shared_types';

@Component({
  selector: 'app-culture-and-timezone',
  templateUrl: './culture-and-timezone.component.html',
  styleUrls: ['./culture-and-timezone.component.css']
})
export class CultureAndTimezoneComponent implements OnInit {

  model: LocationConfigModel;
  form: UntypedFormGroup;

  cultureList: DropdownItem<string>[];
  timeZoneList: DropdownItem<string>[];
  languageList: DropdownItem<string>[];

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

          this.locationService.getLocationConfigModel(location.value)
            .subscribe((model: LocationConfigModel) => {
              this.model = model;
              this.initForm();
            });

        }
      );

    this.commonService.getDropdownList(DropdownType.Culture, '')
      .subscribe(
        (list: DropdownItem<string>[]) => {
          this.cultureList = list;

        }
      );

    this.timeZoneList = [];
    timezoneNames().map(m => this.timeZoneList.push({
      text: m,
      value: m
    }));

    // this.timeZoneList = timezoneNames;

    // this.commonService.getDropdownList(DropdownType.Timezone, '')
    //   .subscribe(
    //     (list: DropdownItem<string>[]) => {
    //       this.timeZoneList = list;

    //     }
    //   );

    this.commonService.getDropdownList(DropdownType.Language, '')
      .subscribe(
        (list: DropdownItem<string>[]) => {
          this.languageList = list;

        }
      );

  }

  private initForm(): void {

    let id = '';
    let culture = null;
    let timezone = null;
    let language = null;

    if (this.model) {

      id = this.model.id;
      culture = this.model.culture;
      timezone = this.model.timeZone;
      language = this.model.language;

    }

    this.form = new UntypedFormGroup({

      id: new UntypedFormControl(id),
      culture: new UntypedFormControl(
        culture,
        [
          UtilityRix.dropdownRequired
        ]),
      timeZone: new UntypedFormControl(
        timezone,
        [
          UtilityRix.dropdownRequired
        ]),
      language: new UntypedFormControl(
        language,
        [
          UtilityRix.dropdownRequired
        ]),

    });

  }

  submit(): void {
    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    this.model = this.form.value;
    this.locationService.updateLocationConfig(this.model)
      .subscribe(
        (response: ResponseModel) => {
          if (response.hasError) {
            this.alertService.setErrorAlert(response.msg);
            return;
          }
          this.notificationService.show(
            UtilityRix.getSuccsessNotification('Location updated successfully'));
          this.ngOnInit();
        }
      );
  }

}
