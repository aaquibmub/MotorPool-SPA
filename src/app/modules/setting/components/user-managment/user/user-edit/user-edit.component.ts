import { ResponseModel } from './../../../../../../helper/models/common/response-model';
import { UtilityRix } from './../../../../../../helper/common/utility-rix';
import { AlertService } from './../../../../../../helper/services/common/alert.service';
import { UserService } from 'src/app/helper/services/auth/user.service';
import { CommonService } from './../../../../../../helper/services/common/common.service';
import { UtilityService } from './../../../../../../helper/services/common/utility.service';
import { DropdownItem } from './../../../../../../helper/models/common/dropdown/dropdown-item.model';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UserModel } from './../../../../../../helper/models/settings/user-management/users/user-model';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id: string;
  editMode = false;
  model: UserModel;
  form: UntypedFormGroup;

  countryList: DropdownItem<string>[];
  roleList: DropdownItem<string>[];

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
          this.userService.getUser(params.id)
            .subscribe((model: UserModel) => {
              this.model = model;
              this.editMode = true;
              this.initForm();
            });
        } else {
          this.initForm();
        }
      });

    this.userService.getRoleDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.roleList = list;
      });

    this.commonService.getCountryDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.countryList = list;
      });

  }

  private initForm(): void {

    let firstName: string = null;
    let lastName: string = null;
    let nationality: DropdownItem<string> = null;
    let email: string = null;
    let mobile: string = '';
    let login: string = null;
    let password = '';
    let confirmPassword = '';
    let role: DropdownItem<string> = null;

    if (this.model) {
      firstName = this.model.firstName;
      lastName = this.model.lastName;
      nationality = this.model.nationality;

      email = this.model.email;
      mobile = this.model.mobile;
      login = this.model.login;
      password = '';

      role = this.model.role;
    }

    this.form = new UntypedFormGroup({
      firstName: new UntypedFormControl(
        firstName, [Validators.required]),
      lastName: new UntypedFormControl(
        lastName, [Validators.required]),
      nationality: new UntypedFormControl(
        nationality, [UtilityRix.dropdownRequired as ValidatorFn]),
      email: new UntypedFormControl(
        email, [Validators.required]),
      mobile: new UntypedFormControl(
        mobile, [Validators.required]),
      login: new UntypedFormControl(
        login, [Validators.required]),
      password: new UntypedFormControl(
        password, [Validators.required]),
      confirmPassword: new UntypedFormControl(
        confirmPassword, [Validators.required]),
      role: new UntypedFormControl(
        role, [UtilityRix.dropdownRequired as ValidatorFn]),
    });

  }

  cancel(): void {
    this.router.navigate(['/setting/user-management/users/']);
  }

  submit(): void {
    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    const formValue = this.form.value as UserModel;
    debugger;
    formValue.userID = this.id;
    const primaryAction = this.editMode ? 'Update' : 'Create';
    const successAction = this.editMode ? 'Updated' : 'Created';
    const primaryMsg = 'Do you want to ' + primaryAction + ' user?';

    const dialog: DialogRef = this.dialogService
      .open(this.alertService.getConfirmDialougeConfig(
        'Confirm ' + primaryAction, primaryMsg, primaryAction));

    dialog.result.subscribe((result: any) => {
      if (result.text === primaryAction) {
        this.userService.addUpdateUser(formValue)
          .subscribe(
            (response: ResponseModel<string>) => {

              if (response.hasError) {
                this.alertService.setErrorAlert(response.msg);
                return;
              }

              this.alertService.setSuccessAlert(
                'User is '
                + successAction
                + ' successfully');

              this.utilityService.redirectToUrl('/setting/user-management/users');

            }
          );
      }
    });
  }

}
