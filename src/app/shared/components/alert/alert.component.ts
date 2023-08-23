import { OverlayService } from './../../../helper/services/common/overlay.service';
import { ResponseAction } from './../../../helper/common/shared-types';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DialogSettings } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() type: string;
  @Input() settings: DialogSettings;
  @Input() action: ResponseAction;
  @Input() arg: any;

  constructor(
    private overlayService: OverlayService
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.overlayService.setShowHideAlert(false);
  }

  confirm(): void {
    this.overlayService.setShowHideAlert(false);
    // if (this.action) {
    //   switch (this.action) {
    //     case ResponseAction.OpenCasDrawer: {
    //       this.cashRegisterService.setCashRegisterOpenClosePopup(true, this.arg);
    //       break;
    //     }
    //     default: {

    //     }
    //   }
    // }
  }

}
