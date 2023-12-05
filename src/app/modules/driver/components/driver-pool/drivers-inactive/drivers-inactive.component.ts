import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { NotificationService } from '@progress/kendo-angular-notification';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { ActionButton } from 'src/app/helper/models/common/grid/action-button';
import { PopupConfigModel } from 'src/app/helper/models/common/popup-config-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { DriverStatus } from './../../../../../helper/common/shared-types';
import { ResponseModel } from './../../../../../helper/models/common/response-model';
import { DriverGridModel } from './../../../../../helper/models/drivers/driver-grid-model';
import { AlertService } from './../../../../../helper/services/common/alert.service';
import { GridToolbarService } from './../../../../../helper/services/common/grid-toolbar.service';
import { DriverService } from './../../../../../helper/services/drivers/driver.service';

@Component({
  selector: 'app-drivers-inactive',
  templateUrl: './drivers-inactive.component.html',
  styleUrls: ['./drivers-inactive.component.css']
})
export class DriversInactiveComponent implements OnInit {

  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;

  pageSizeSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private driverService: DriverService,
    private router: Router,
    private alertService: AlertService,
    private notificationService: NotificationService,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit(): void {
    this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.driverService.fetchGridData(this.state, this.searchQuery, false);
        }
      );
    this.driverService.getAllocateVehicalPopup().subscribe(
      (config: PopupConfigModel) => {
        if (!config.show) {
          this.driverService.fetchGridData(this.state, this.searchQuery, false);
        }
      }
    );
    this.driverService.getDeallocateVehicalPopup().subscribe(
      (config: PopupConfigModel) => {
        if (!config.show) {
          this.driverService.fetchGridData(this.state, this.searchQuery, false);
        }
      }
    );
    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.driverService.fetchGridData(this.state, this.searchQuery, false);
        }
      );

    this.driverService.fetchGridData(this.state, this.searchQuery, false);
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
    this.driverService.fetchGridData(state, this.searchQuery, false);
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
          if (item.status) {
            this.driverService.disable(item.id)
              .subscribe(
                (response: ResponseModel<string>) => {
                  if (response.hasError) {
                    this.alertService.setErrorAlert(response.msg);
                    return;
                  }
                  this.notificationService.show(
                    UtilityRix.getSuccsessNotification('Driver Deactivated'));
                  this.driverService.fetchGridData(this.state, this.searchQuery, false);

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
                  this.driverService.fetchGridData(this.state, this.searchQuery, false);

                }
              );
          }
        },
        icon: '',
        label: item.status ? 'Disable' : 'Enable'
      }
    ];
    if (item.status != DriverStatus.Busy
      && item.status != DriverStatus.OffDuty) {
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

  ngOnDestroy(): void {
    this.pageSizeSubscription.unsubscribe();
  }
}

