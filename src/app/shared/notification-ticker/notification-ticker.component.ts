import { NotificationListModel } from './../../helper/models/common/notifications/notification-list-model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-ticker',
  templateUrl: './notification-ticker.component.html',
  styleUrls: ['./notification-ticker.component.scss']
})
export class NotificationTickerComponent implements OnInit {
  @Input() notifications: NotificationListModel[];
  constructor(
  ) { }

  ngOnInit(): void {
  }

}
