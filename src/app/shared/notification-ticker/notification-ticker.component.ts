import { Component, Input, OnInit } from '@angular/core';
import { NotificationTickerService } from 'src/app/helper/services/common/notification.service';
import { NotificationListModel } from './../../helper/models/common/notifications/notification-list-model';

@Component({
  selector: 'app-notification-ticker',
  templateUrl: './notification-ticker.component.html',
  styleUrls: ['./notification-ticker.component.scss']
})
export class NotificationTickerComponent implements OnInit {
  @Input() notifications: NotificationListModel[];

  constructor(
    private notificationService: NotificationTickerService,
  ) { }

  ngOnInit(): void {

    this.notificationService.notificationList.subscribe({
      next: (notificationList: NotificationListModel[]) => {
        this.notifications = notificationList;
      },
      error: (err) => console.error(err)
    });
  }

  markAsRead(): void {
    this.notificationService.updateActivitiesToSeen();
  }

}
