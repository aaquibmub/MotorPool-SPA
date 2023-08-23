import { UserRoleType } from './../../../../helper/common/shared-types';
import { AlertService } from './../../../../helper/services/common/alert.service';
import { AuthService } from './../../../../helper/services/auth/auth.service';
import { LoginModel } from './../../../../helper/models/auth/login-model';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  passwordType: string;
  model: LoginModel;
  loginFailed = false;

  constructor(
    private authService: AuthService,
    private alertify: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loginFailed = false;
    this.passwordType = 'password';
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = new UntypedFormGroup({
      userName: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required)
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.model = this.loginForm.value;
    this.authService.login(this.model)
      .subscribe(
        () => {
          const currentUser = this.authService.getCurrentUser();
          if (currentUser.roleType === UserRoleType.Driver) {
            this.router.navigate(['/driver']);
            return;
          }
          this.router.navigate(['/home']);
        },
        (error) => {
          this.loginFailed = true;
          // this.alertify.setErrorAlert('Login failed! login id or password not correct!');
        }
      );
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  showHidePassword(type: string): void {
    this.passwordType = type;
  }

  // On Forgotpassword link click
  onForgotpassword(): void {
    this.router.navigate(['forgot-password'], { relativeTo: this.route.parent });
  }

}
