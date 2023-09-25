import { environment } from './../../../../environments/environment';
import { NotificationService } from './notification.service';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: HubConnection;
  private notificationUrl = environment.baseUrl + 'signalr/';
  private notificationApiUrl = environment.apiUrl + 'notification/';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService) { }

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
      this.notificationService.setNotificationList();
    });
  }

}
