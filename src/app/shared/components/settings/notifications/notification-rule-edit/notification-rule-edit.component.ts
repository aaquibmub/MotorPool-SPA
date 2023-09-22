import { ResponseModel } from './../../../../../helper/models/common/response-model';
import { UtilityRix } from './../../../../../helper/common/utility-rix';
import { GridList } from './../../../../../helper/models/common/grid/grid-list';
import { UserRoleModel } from './../../../../../helper/models/auth/user-role-model';
import { AlertService } from './../../../../../helper/services/common/alert.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { NotificationFeatureModel } from './../../../../../helper/models/settings/notification-config/notification-feature-model';
import { GridComponent } from '@progress/kendo-angular-grid';
import { GetNotificationForDropdownList, GetUserRoleListForNotification, NotificationFor, UserRoleType } from './../../../../../helper/common/shared-types';
import { DropdownItem } from './../../../../../helper/models/common/dropdown/dropdown-item.model';
import { NotificationConfigModel, NotificationConfigUserModel } from './../../../../../helper/models/settings/notification-config/notification-config-model';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { NotificationConfigService } from 'src/app/helper/services/utilities/notification-config.service';
import { UserService } from 'src/app/helper/services/auth/user.service';

@Component({
  selector: 'app-notification-rule-edit',
  templateUrl: './notification-rule-edit.component.html',
  styleUrls: ['./notification-rule-edit.component.css']
})
export class NotificationRuleEditComponent implements OnInit {
  @Input() ruleId: string;

  form: UntypedFormGroup;
  model: NotificationConfigModel;

  userRoleList: DropdownItem<UserRoleType>[];
  userGridList: NotificationConfigUserModel[];
  myUserSelection: string[] = [];
  @ViewChild(GridComponent)
  public userGrid: GridComponent;

  eventCategoryList: DropdownItem<NotificationFor>[];
  eventGridList: NotificationFeatureModel[];
  myEventSelection: string[] = [];
  @ViewChild(GridComponent)
  public eventGrid: GridComponent;

  constructor(
    private el: ElementRef,
    private notificationService: NotificationService,
    public utilityService: UtilityService,
    private userService: UserService,
    private notificationConfigService: NotificationConfigService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.userRoleList = GetUserRoleListForNotification();
    this.eventCategoryList = GetNotificationForDropdownList();

    if (!this.ruleId) {
      this.initForm();
    } else {
      this.notificationConfigService.get(this.ruleId)
        .subscribe(
          (model: NotificationConfigModel) => {
            this.model = model;
            this.initForm();
          }
        );
    }
  }

  private initForm(): void {

    let name = '';
    let pushType = true;
    let emailType = true;

    const userRoleType = this.userRoleList[0];
    const eventCategory = this.eventCategoryList[0];

    if (this.model) {
      name = this.model.name;
      pushType = this.model.onSystem;
      emailType = this.model.onEmail;
    }

    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(name, [Validators.required]),
      onSystem: new UntypedFormControl(pushType),
      onEmail: new UntypedFormControl(emailType),
      userRole: new UntypedFormControl(userRoleType),
      eventCategory: new UntypedFormControl(eventCategory)
    });

    this.handleUserRoleValueChange(userRoleType);
    this.handleEventCategoryValueChange(eventCategory);
  }

  handleUserRoleValueChange(value: DropdownItem<UserRoleType>): void {
    this.userService.getUsersByRole(value.value)
      .subscribe(
        (list: UserRoleModel[]) => {
          this.userGridList = [];
          list.forEach(f => {
            this.userGridList.push({
              id: f.user.value,
              user: f.user,
              role: f.role
            });
          });
        }
      );
  }

  handleEventCategoryValueChange(value: DropdownItem<NotificationFor>): void {
    this.notificationConfigService.getFeaturesByCategory(value.value)
      .subscribe(
        (list: GridList<NotificationFeatureModel>) => {
          this.eventGridList = [];
          list.data.forEach(f => {
            this.eventGridList.push(f);
          });
        }
      );
  }


  submit(): void {
    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.overlay-wrapper');
      return;
    }

    if (!this.myUserSelection || this.myUserSelection.length === 0) {
      this.notificationService.show(
        UtilityRix.getWarningNotification('Please select users'));
      return;
    }

    if (!this.myEventSelection || this.myEventSelection.length === 0) {
      this.notificationService.show(
        UtilityRix.getWarningNotification('Please select events'));
      return;
    }

    this.model = this.form.value as NotificationConfigModel;

    this.model.users = this.myUserSelection.map(idx => {
      return this.userGridList.find(item => item.id === idx);
    });

    this.model.features = this.myEventSelection.map(idx => {
      return this.eventGridList.find(item => item.id === idx);
    });

    this.notificationConfigService.addUpdate(this.model)
      .subscribe(
        (response: ResponseModel<string>) => {
          if (response.hasError) {
            this.alertService.setErrorAlert(response.msg);
            return;
          }

          this.notificationConfigService.setNotificationConfigQuickAddPopup(
            { show: false }
          );
        }
      );

  }

  close(): void {
    this.notificationConfigService.setNotificationConfigQuickAddPopup({
      show: false
    });
  }

}
