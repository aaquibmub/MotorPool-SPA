import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { flatten } from '@progress/kendo-angular-grid/dist/es2015/filtering/base-filter-cell.component';
import { NotificationService } from '@progress/kendo-angular-notification';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { DriverStatus, GetDriverStatusForDropdownList } from 'src/app/helper/common/shared-types';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { ActionButton } from 'src/app/helper/models/common/grid/action-button';
import { PopupConfigModel } from 'src/app/helper/models/common/popup-config-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { DropdownItem } from './../../../../../helper/models/common/dropdown/dropdown-item.model';
import { ResponseModel } from './../../../../../helper/models/common/response-model';
import { DriverGridModel } from './../../../../../helper/models/drivers/driver-grid-model';
import { AlertService } from './../../../../../helper/services/common/alert.service';
import { GridToolbarService } from './../../../../../helper/services/common/grid-toolbar.service';
import { DriverService } from './../../../../../helper/services/drivers/driver.service';

@Component({
  selector: 'app-drivers-active',
  templateUrl: './drivers-active.component.html',
  styleUrls: ['./drivers-active.component.css']
})
export class DriversActiveComponent implements OnInit {

  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;

  driverStatusList: DropdownItem<number>[] = [];
  selectedDriverStatus: DropdownItem<number>;

  pageSizeSubscription: Subscription;
  gridFilterSubscription: Subscription;
  refreshScreenSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private driverService: DriverService,
    private router: Router,
    private alertService: AlertService,
    private notificationService: NotificationService,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit(): void {

    this.driverStatusList = GetDriverStatusForDropdownList();

    this.refreshScreenSubscription = this.utilityService.refreshData.subscribe({
      next: (flag: boolean) => {
        if (flag) {
          this.driverService.fetchGridData(this.state, this.searchQuery);
        }
      },
      error: (err) => console.error(err)
    });

    this.gridFilterSubscription = this.gridToolbarService.getGridFilter()
      .subscribe(
        (show: boolean) => {
          this.filterable = show ? UtilityRix.gridConfig.filterable : '';
        }
      );

    this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.driverService.fetchGridData(this.state, this.searchQuery, true);
        }
      );
    this.driverService.getAllocateVehicalPopup().subscribe(
      (config: PopupConfigModel) => {
        if (!config.show) {
          this.driverService.fetchGridData(this.state, this.searchQuery);
        }
      }
    );
    this.driverService.getDeallocateVehicalPopup().subscribe(
      (config: PopupConfigModel) => {
        if (!config.show) {
          this.driverService.fetchGridData(this.state, this.searchQuery);
        }
      }
    );
    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.driverService.fetchGridData(this.state, this.searchQuery);
        }
      );

    this.driverService.fetchGridData(this.state, this.searchQuery);
    this.driverService.getGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );
  }

  dataStateChange(state: DataStateChangeEvent): void {
    debugger;
    this.state = state;
    this.driverService.fetchGridData(state, this.searchQuery);
  }

  getGridActionMenuState(): boolean[] {
    const actionMenuState: boolean[] = [];
    this.gridData.data.forEach(() => {
      actionMenuState.push(false);
    });
    return actionMenuState;
  }

  getGridActions(item: DriverGridModel): ActionButton[] {
    const actions: ActionButton[] = [
      {
        handle: () => {
          if (item.active) {
            this.driverService.disable(item.id)
              .subscribe(
                (response: ResponseModel<string>) => {
                  if (response.hasError) {
                    this.alertService.setErrorAlert(response.msg);
                    return;
                  }
                  this.notificationService.show(
                    UtilityRix.getSuccsessNotification('Driver Deactivated'));
                  this.driverService.fetchGridData(this.state, this.searchQuery);

                }
              );
          }
          else {
            this.driverService.enable(item.id)
              .subscribe(
                (response: ResponseModel<string>) => {
                  if (response.hasError) {
                    this.alertService.setErrorAlert(response.msg);
                    return;
                  }
                  this.notificationService.show(
                    UtilityRix.getSuccsessNotification('Driver Activated'));
                  this.driverService.fetchGridData(this.state, this.searchQuery);

                }
              );
          }
        },
        icon: '',
        label: item.active ? 'Disable' : 'Enable'
      }
    ];
    if (item.driverStatus != DriverStatus.Busy
      && item.driverStatus != DriverStatus.OffDuty) {
      if (item.vehicalAllocated) {
        actions.push({
          handle: () => {
            this.driverService.setDeallocateVehicalPopup(true, item.id);
          },
          icon: '',
          label: 'Deallocate Vehical'
        });

      } else {
        actions.push({
          handle: () => {
            this.driverService.setAllocateVehicalPopup(true, item.id);
          },
          icon: '',
          label: 'Allocate Vehical'
        });

      }
    }

    return actions;
  }

  handleDriverStatusValueChange(value: DropdownItem<number>): void {
    const root = { logic: 'and', filters: [], ...this.state.filter };
    const [filter] = flatten(root).filter(x => x.field === "driverStatus");
    if (!filter) {
      root.filters.push({
        field: "driverStatus",
        operator: "eq",
        value: value.value
      });
    } else {
      filter.value = value.value;
    }
    this.selectedDriverStatus = value;
    this.state.filter = root;
    this.dataStateChange(this.state as DataStateChangeEvent);
  }

  ngOnDestroy(): void {
    this.pageSizeSubscription.unsubscribe();
    if (this.gridFilterSubscription) {
      this.gridFilterSubscription.unsubscribe();
    }
    if (this.refreshScreenSubscription) {
      this.refreshScreenSubscription.unsubscribe();
    }
  }
}

