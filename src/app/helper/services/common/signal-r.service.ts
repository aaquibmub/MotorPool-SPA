import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Observable, from } from 'rxjs';
import { UtilityRix } from '../../common/utility-rix';
import { ActivityLogModel } from '../../models/reports/log/activity-log-model';
import { AuthService } from '../auth/auth.service';
import { DashboardService } from '../utilities/dashboard.service';
import { environment } from './../../../../environments/environment';
import { AlertService } from './alert.service';
import { NotificationTickerService } from './notification.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: HubConnection;
  private notificationUrl = environment.baseUrl + 'signalr/';
  private notificationApiUrl = environment.apiUrl + 'notification/';

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService,
    private authService: AuthService,
    private notificationTickerService: NotificationTickerService,
    private notificationService: NotificationService,
    private dashboardService: DashboardService,
    private alertService: AlertService) { }

  public connect = () => {
    this.startConnection();
    this.addListeners();
  }

  public updateNotificationList(): Observable<any> {
    const promise = this.hubConnection.invoke('UpdateNotificationList')
      .then(() => { console.log('message sent successfully to hub'); })
      .catch((err) => console.log('error while sending a message to hub: ' + err));

    return from(promise);
  }

  private getConnection(): HubConnection {
    return new HubConnectionBuilder()
      .withUrl(this.notificationUrl)
      .build();
  }

  private startConnection(): void {
    this.hubConnection = this.getConnection();

    this.hubConnection.start()
      .then(() => console.log('connection started'))
      .catch((err) => console.log('error while establishing signalr connection: ' + err));
  }

  private addListeners(): void {
    this.hubConnection.on('updateNotificationList', () => {
      console.log('message received from API Controller');
      this.notificationTickerService.setNotificationList();
    });
    this.hubConnection.on('RefreshData', () => {
      this.utilityService.setRefreshData();
    });
    this.hubConnection.on('ActivityNotification', (model: ActivityLogModel) => {

      console.log('message received from API Controller');

      var user = this.authService.getCurrentUser();
      if (user && user.id == model.userID) {
        this.utilityService.playNotificationSound();
        this.notificationService.show(
          UtilityRix.getSuccsessNotification(model.message));
      }
    });
  }

}
