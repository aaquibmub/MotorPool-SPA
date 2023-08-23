import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NotificationListModel } from '../../models/common/notifications/notification-list-model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
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

}
