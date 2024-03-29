import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { NotificationService } from '@progress/kendo-angular-notification';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { ActionButton } from 'src/app/helper/models/common/grid/action-button';
import { PopupConfigModel } from 'src/app/helper/models/common/popup-config-model';
import { NotificationConfigGridModel } from 'src/app/helper/models/settings/notification-config/notification-config-grid-model';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { NotificationConfigService } from 'src/app/helper/services/utilities/notification-config.service';
import { ResponseModel } from './../../../../helper/models/common/response-model';
import { GridToolbarService } from './../../../../helper/services/common/grid-toolbar.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';

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
  notificationRuleAddUpdatePopupSubscription: Subscription;

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
    private notificationService: NotificationService,
    private alertService: AlertService,
    private notificationConfigService: NotificationConfigService,
    private router: Router,
    private gridToolbarService: GridToolbarService,
    public utilityService: UtilityService,
  ) { }

  ngOnInit(): void {

    this.notificationRuleAddUpdatePopupSubscription = this.notificationConfigService.getNotificationConfigQuickAddPopup()
      .subscribe(
        (model: PopupConfigModel) => {
          if (!model.show) {
            this.notificationConfigService.fetchGridData(this.state, this.searchQuery);
          }
        }
      );

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
          this.gridData.data = data.data ?? [];
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
        this.notificationConfigService.setNotificationConfigQuickAddPopup({
          show: true,
          arg: item.id
        });
      },
      icon: '',
      label: 'Edit'
    });
    actions.push({
      handle: () => {
        this.notificationConfigService.delete(item.id)
          .subscribe(
            (response: ResponseModel<string>) => {
              if (response.hasError) {
                this.alertService.setErrorAlert(response.msg);
                return;
              }
              this.notificationService.show(
                UtilityRix.getSuccsessNotification('Notification rule deleted'));
              this.notificationConfigService.fetchGridData(this.state, this.searchQuery);
            }
          );
      },
      icon: '',
      label: 'Delete'
    });

    return actions;
  }

  ngOnDestroy(): void {
    this.pageSizeSubscription.unsubscribe();

    if (this.notificationRuleAddUpdatePopupSubscription) {
      this.notificationRuleAddUpdatePopupSubscription.unsubscribe();
    }
  }

}
