import { Injectable } from '@angular/core';
import { DialogSettings } from '@progress/kendo-angular-dialog';
import { Observable, Subject } from 'rxjs';
import { ResponseAction } from '../../common/shared-types';


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSuccess = new Subject<DialogSettings>();
  private alertWarning = new Subject<DialogSettings>();
  private alertError = new Subject<{
    alertSettings: DialogSettings,
    action: ResponseAction,
    arg: any
  }>();

  getSuccessAlert(): Observable<DialogSettings> {
    return this.alertSuccess.asObservable();
  }

  setSuccessAlert(msg: string): void {
    this.alertSuccess.next({
      content: msg
    });
  }

  getErrorAlert(): Observable<{
    alertSettings: DialogSettings,
    action?: ResponseAction,
    arg: any
  }> {
    return this.alertError.asObservable();
  }

  setErrorAlert(
    msg: string,
    action?: ResponseAction,
    arg?: any): void {
    this.alertError.next({
      alertSettings: {
        content: msg
      },
      action,
      arg
    });
  }

  getWarningAlert(): Observable<DialogSettings> {
    return this.alertWarning.asObservable();
  }

  setWarningAlert(msg: string): void {
    this.alertWarning.next({
      content: msg
    });
  }
}
