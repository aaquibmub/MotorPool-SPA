import { Component, OnInit } from '@angular/core';
import { DialogSettings } from '@progress/kendo-angular-dialog';
import { ResponseAction } from './helper/common/shared-types';
import { AuthService } from './helper/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from './helper/services/common/alert.service';
import { CldrIntlService, IntlService } from '@progress/kendo-angular-intl';
import { OverlayService } from './helper/services/common/overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  iframeSrc: string;

  // alert arguments
  opened = false;
  type: string;
  settings: DialogSettings;
  action: ResponseAction;
  arg: any;

  // loader ui
  showLoader = false;

  constructor(
    private authService: AuthService,
    translate: TranslateService,
    private overlayService: OverlayService,
    public intlService: IntlService,
    // private signalRService: SignalRService,
    private alertService: AlertService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      // (this.intlService as CldrIntlService).localeId = 'ar-SA';
      (this.intlService as CldrIntlService).localeId = 'en-US';
    }

    // this.signalRService.connect();

    this.overlayService.getShowHideAlert().subscribe(
      (showAlert: boolean) => {
        this.opened = showAlert;
      }
    );

    this.alertService.getSuccessAlert().subscribe(
      (data: DialogSettings) => {
        if (data) {
          this.type = 'success';
          this.overlayService.setShowHideAlert(true);
          this.settings = data;
        }
      }
    );

    this.alertService.getErrorAlert().subscribe(
      (data: {
        alertSettings: DialogSettings,
        action?: ResponseAction,
        arg?: any
      }) => {
        this.type = 'error';
        this.overlayService.setShowHideAlert(true);
        if (data) {
          this.settings = data.alertSettings;
          this.action = data.action;
          this.arg = data.arg;
        }
      }
    );

    this.alertService.getWarningAlert().subscribe(
      (data: DialogSettings) => {
        if (data) {
          this.type = 'warning';
          this.overlayService.setShowHideAlert(true);
          this.settings = data;
        }
      }
    );

    this.overlayService.getShowHideLoader().subscribe({
      next: (flag) => {
        this.showLoader = flag;
      }
    }
    );
  }
}
