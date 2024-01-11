import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { GetUserRoleListForNotification, UserRoleType } from 'src/app/helper/common/shared-types';
import { PermissionModel } from 'src/app/helper/models/settings/user-management/roles/permission-model';
import { UserService } from 'src/app/helper/services/auth/user.service';
import { UtilityRix } from './../../../../../../helper/common/utility-rix';
import { DropdownItem } from './../../../../../../helper/models/common/dropdown/dropdown-item.model';
import { ResponseModel } from './../../../../../../helper/models/common/response-model';
import { RoleModel } from './../../../../../../helper/models/settings/user-management/roles/role-model';
import { AlertService } from './../../../../../../helper/services/common/alert.service';
import { CommonService } from './../../../../../../helper/services/common/common.service';
import { UtilityService } from './../../../../../../helper/services/common/utility.service';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {

  id: string;
  editMode = false;
  model: RoleModel;
  form: UntypedFormGroup;

  roleTypeList: DropdownItem<UserRoleType>[];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    public utilityService: UtilityService,
    private commonService: CommonService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.route.params
      .subscribe((params: Params) => {
        if (params.id != null) {
          this.id = params.id;
          this.userService.getRole(params.id)
            .subscribe((model: RoleModel) => {
              this.model = model;
              this.editMode = true;
              this.initForm();
            });
        } else {
          this.userService.getPermissionByType(UserRoleType.Admin)
            .subscribe(
              (permissions: PermissionModel[]) => {
                this.model = {
                  roleID: '',
                  name: '',
                  type: { value: UserRoleType.Admin, text: '' },
                  permissions
                }
                this.initForm();
              }
            );

        }
      });

    this.roleTypeList = GetUserRoleListForNotification().filter(f => f.value !== 0);

  }

  private initForm(): void {

    let name: string = null;
    let type: DropdownItem<UserRoleType> = null;
    let permissions: UntypedFormGroup[] = [];

    if (this.model) {
      name = this.model.name;
      type = this.model.type;

      if (this.model.permissions && this.model.permissions.length > 0) {
        this.model.permissions.forEach(f => {
          permissions.push(this.userService.createPermissionFormGroup(f));
        });
      }

    }

    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(
        name, [Validators.required]),
      type: new UntypedFormControl(
        type, [UtilityRix.dropdownRequired as ValidatorFn]),
      permissions: new UntypedFormArray(permissions),

    });

  }

  cancel(): void {
    this.router.navigate(['/setting/user-management/roles/']);
  }

  submit(): void {
    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    const formValue = this.form.value as RoleModel;

    formValue.roleID = this.id;
    const primaryAction = this.editMode ? 'Update' : 'Create';
    const successAction = this.editMode ? 'Updated' : 'Created';
    const primaryMsg = 'Do you want to ' + primaryAction + ' user?';

    const dialog: DialogRef = this.dialogService
      .open(this.alertService.getConfirmDialougeConfig(
        'Confirm ' + primaryAction, primaryMsg, primaryAction));

    dialog.result.subscribe((result: any) => {
      if (result.text === primaryAction) {
        this.userService.addUpdateRole(formValue)
          .subscribe(
            (response: ResponseModel<string>) => {

              if (response.hasError) {
                this.alertService.setErrorAlert(response.msg);
                return;
              }

              this.alertService.setSuccessAlert(
                'Role is '
                + successAction
                + ' successfully');

              this.utilityService.redirectToUrl('/setting/user-management/roles');

            }
          );
      }
    });
  }

  handleTypeValueChange(value: DropdownItem<UserRoleType>): void {
    (this.form.get('permissions') as UntypedFormArray).clear();
    if (value == null || value.value === null) {
      return;
    }
    this.userService.getPermissionByType(value.value)
      .subscribe((permissions: PermissionModel[]) => {
        if (permissions && permissions.length > 0) {
          permissions.forEach(f => {
            (this.form.get('permissions') as UntypedFormArray)
              .push(this.userService.createPermissionFormGroup(f));
          });
        }
      });
  }

}
