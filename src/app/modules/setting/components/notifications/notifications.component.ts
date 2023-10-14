import { GridToolbarService } from './../../../../helper/services/common/grid-toolbar.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { ActionButton } from 'src/app/helper/models/common/grid/action-button';
import { NotificationConfigService } from 'src/app/helper/services/utilities/notification-config.service';
import { NotificationConfigGridModel } from 'src/app/helper/models/settings/notification-config/notification-config-grid-model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;

  @ViewChild(GridComponent)
  public notificationConfigsGrid: GridComponent;

  pageSizeSubscription: Subscription;

  createButton: ActionButton = {
    handle: () => {
      this.notificationConfigService.setNotificationConfigQuickAddPopup({
        show: true
      });
      // this.router.navigate(['/inventory/notificationConfigs/new']);
    },
    icon: '',
    label: 'New Rule'
  };

  // notificationConfigType = NotificationConfigType;

  constructor(
    private notificationConfigService: NotificationConfigService,
    private router: Router,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit(): void {

    this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.notificationConfigService.fetchGridData(this.state, this.searchQuery);
        }
      );
    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.notificationConfigService.fetchGridData(this.state, this.searchQuery);
        }
      );

    this.notificationConfigService.fetchGridData(this.state, this.searchQuery);
    this.notificationConfigService.getGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.notificationConfigService.fetchGridData(state, this.searchQuery);
  }

  getGridActionMenuState(): boolean[] {
    const actionMenuState: boolean[] = [];
    this.gridData.data.forEach(() => {
      actionMenuState.push(false);
    });
    return actionMenuState;
  }

  getGridActions(item: NotificationConfigGridModel): ActionButton[] {
    const actions: ActionButton[] = [];

    actions.push({
      handle: () => {
        // this.router.navigate(['/inventory/notificationConfigs/' + item.itemID + '/view']);
      },
      icon: '',
      label: 'Delete'
    });

    return actions;
  }

  ngOnDestroy(): void {
    this.pageSizeSubscription.unsubscribe();
  }

}
