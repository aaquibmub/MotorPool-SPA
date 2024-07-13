import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogSettings } from '@progress/kendo-angular-dialog';
import { CldrIntlService, IntlService } from '@progress/kendo-angular-intl';
import { ResponseAction } from './helper/common/shared-types';
import { PopupConfigModel } from './helper/models/common/popup-config-model';
import { AddressService } from './helper/services/address/address.service';
import { AuthService } from './helper/services/auth/auth.service';
import { AlertService } from './helper/services/common/alert.service';
import { OverlayService } from './helper/services/common/overlay.service';
import { SignalRService } from './helper/services/common/signal-r.service';
import { DriverService } from './helper/services/drivers/driver.service';
import { PassengerService } from './helper/services/trips/passenger.service';
import { TripService } from './helper/services/trips/trip.service';
import { NotificationConfigService } from './helper/services/utilities/notification-config.service';
import { VehicalService } from './helper/services/vehicals/vehical.service';

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

  // passenger
  showPassengerQuickAddPopup = false;
  passengerQuickAddPopupArg: any;
  showTripPassengerPopup = false;
  tripPassengerPopupArg: any;

  // address
  showAddressQuickAddPopup = false;
  addressQuickAddPopupArg: any;

  // notification rule
  showNotificationRulePopupPopup: boolean;
  ruleId: string;

  // trip execute/cancel
  showTripExecutePopup: boolean;
  showTripHandoverPopup: boolean;
  showTripCancelPopup: boolean;
  showTripOdoMeterPopup: boolean;
  tripId: string;

  // allocate vehical
  showAllocateVehicalPopup: boolean;
  showDeallocateVehicalPopup: boolean;
  driverId: string;

  showUpdateOdoMeterPopup: boolean;


  constructor(
    private authService: AuthService,
    translate: TranslateService,
    private overlayService: OverlayService,
    public intlService: IntlService,
    private signalRService: SignalRService,
    private alertService: AlertService,
    private notificationConfigService: NotificationConfigService,
    private tripService: TripService,
    private driverService: DriverService,
    private vehicleService: VehicalService,
    private passengerService: PassengerService,
    private addressService: AddressService) {
    translate.setDefaultLang('en');
    translate.use('en');
    // translate.setDefaultLang('ar');
    // translate.use('ar');
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      // (this.intlService as CldrIntlService).localeId = 'ar-SA';
      (this.intlService as CldrIntlService).localeId = 'en-US';
    }

    this.signalRService.connect();

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

    this.passengerService.getQuickAddPopup().subscribe({
      next: (flag: PopupConfigModel) => {
        this.showPassengerQuickAddPopup = flag.show;
        this.passengerQuickAddPopupArg = flag.arg;
      }
    }
    );

    this.tripService.getTripPassengerPopup().subscribe({
      next: (flag: PopupConfigModel) => {
        this.showTripPassengerPopup = flag.show;
        this.tripPassengerPopupArg = flag.arg;
      }
    }
    );

    this.addressService.getQuickAddPopup().subscribe({
      next: (flag: PopupConfigModel) => {
        this.showAddressQuickAddPopup = flag.show;
        this.addressQuickAddPopupArg = flag.arg;
      }
    }
    );

    this.notificationConfigService.getNotificationConfigQuickAddPopup()
      .subscribe({
        next: (flag: PopupConfigModel) => {
          this.showNotificationRulePopupPopup = flag.show;
          this.ruleId = flag.arg;
        }
      }
      );

    this.tripService.getTripExecutePopup()
      .subscribe({
        next: (flag: PopupConfigModel) => {
          this.showTripExecutePopup = flag.show;
          this.tripId = flag.arg;
        }
      }
      );

    this.tripService.getTripHandoverPopup()
      .subscribe({
        next: (flag: PopupConfigModel) => {
          this.showTripHandoverPopup = flag.show;
          this.tripId = flag.arg;
        }
      }
      );

    this.tripService.getTripCancelPopup()
      .subscribe({
        next: (flag: PopupConfigModel) => {
          this.showTripCancelPopup = flag.show;
          this.tripId = flag.arg;
        }
      }
      );

    this.tripService.getTripOdoMeterPopup()
      .subscribe({
        next: (flag: PopupConfigModel) => {
          this.showTripOdoMeterPopup = flag.show;
          this.tripId = flag.arg;
        }
      }
      );

    this.driverService.getAllocateVehicalPopup()
      .subscribe({
        next: (flag: PopupConfigModel) => {
          this.showAllocateVehicalPopup = flag.show;
          this.driverId = flag.arg;
        }
      }
      );

    this.driverService.getDeallocateVehicalPopup()
      .subscribe({
        next: (flag: PopupConfigModel) => {
          this.showDeallocateVehicalPopup = flag.show;
          this.driverId = flag.arg;
        }
      }
      );

    this.vehicleService.getUpdateOdoMeterPopup()
      .subscribe({
        next: (flag: PopupConfigModel) => {
          this.showUpdateOdoMeterPopup = flag.show;
        }
      }
      );

  }
}
