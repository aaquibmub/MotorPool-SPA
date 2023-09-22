import { SmartpayConfigModel } from './../../../../helper/models/config/integrations/smartpay-config-model';
import { SmartpayService } from './../../../../helper/services/config/smartpay.service';
import { SquareIntegrationConfigModel } from './../../../../helper/models/config/integrations/square-integration-config-model';
import { Subscription } from 'rxjs';
import { SquareIntegrationService } from './../../../../helper/services/config/square-integration.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopupConfigModel } from 'src/app/helper/models/common/popup-config-model';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent implements OnInit, OnDestroy {

  squareIntegrationPopupSubs: Subscription;
  smartpayPopupSubs: Subscription;

  enableSquareConfig: boolean;
  enableSmartpayConfig: boolean;

  constructor(
    private squareIntegrationService: SquareIntegrationService,
    private smartpayService: SmartpayService
  ) { }

  ngOnInit(): void {

    this.squareIntegrationService.getSquareIntegrationConfig()
      .subscribe(
        (model: SquareIntegrationConfigModel) => {
          this.enableSquareConfig = !model.newIntegration;
        }
      );

    this.squareIntegrationPopupSubs = this.squareIntegrationService.getSquareIntegrationPopup()
      .subscribe(
        (popupConfig: PopupConfigModel) => {
          this.squareIntegrationService.getSquareIntegrationConfig()
            .subscribe(
              (model: SquareIntegrationConfigModel) => {
                this.enableSquareConfig = !model.newIntegration;
              }
            );
        }
      );

    this.smartpayService.getSmartpayConfig()
      .subscribe(
        (model: SmartpayConfigModel) => {
          this.enableSmartpayConfig = !!model.code;
        }
      );

    this.smartpayPopupSubs = this.smartpayService.getSmartpayPopup()
      .subscribe(
        (popupConfig: PopupConfigModel) => {
          this.smartpayService.getSmartpayConfig()
            .subscribe(
              (model: SmartpayConfigModel) => {
                this.enableSmartpayConfig = !!model.code;
              }
            );
        }
      );
  }

  handleEnableSquareValueChange(value: boolean): void {
    if (value) {
      this.squareIntegrationService.setSquareIntegrationPopup({
        show: true
      });
    } else {
    }
  }

  handleEnableSmartpayValueChange(value: boolean): void {
    if (value) {
      this.smartpayService.setSmartpayPopup({
        show: true
      });
    } else {
    }
  }

  ngOnDestroy(): void {
    if (this.squareIntegrationPopupSubs) {
      this.squareIntegrationPopupSubs.unsubscribe();
    }
    if (this.smartpayPopupSubs) {
      this.smartpayPopupSubs.unsubscribe();
    }
  }

}
