import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationListModel } from '../../models/common/notifications/notification-list-model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationTickerService {
  notificationUrl = environment.apiUrl + 'notification/';
  notificationList = new Subject<NotificationListModel[]>();
  showHideNotificationTicker = new Subject<boolean>();

  constructor(
    private http: HttpClient) { }

  setNotificationList(): void {
    this.http.get<NotificationListModel[]>(
      this.notificationUrl + 'getnotificationlist'
    ).subscribe((notificationList: NotificationListModel[]) => {
      this.notificationList.next(notificationList);
    });
  }

  setShowHideNotificationTicker(flag: boolean): void {
    this.showHideNotificationTicker.next(flag);
  }

  updateActivitiesToSeen(): void {
    this.http.post(
      this.notificationUrl + 'update-activities-to-seen',
      {}
    ).subscribe(() => {
      this.setNotificationList();
    });
  }

}
