import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { NotificationService } from '@progress/kendo-angular-notification';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { AddressGridModel } from 'src/app/helper/models/address/address-grid-model';
import { ActionButton } from 'src/app/helper/models/common/grid/action-button';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { AddressService } from 'src/app/helper/services/address/address.service';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { GridToolbarService } from 'src/app/helper/services/common/grid-toolbar.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';

@Component({
  selector: 'app-addresses-inactive',
  templateUrl: './addresses-inactive.component.html',
  styleUrls: ['./addresses-inactive.component.css']
})
export class AddressesInactiveComponent implements OnInit {

  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;

  pageSizeSubscription: Subscription;
  gridFilterSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private addressService: AddressService,
    private alertService: AlertService,
    private notificationService: NotificationService,
    private router: Router,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit(): void {
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
          this.addressService.fetchGridData(this.state, this.searchQuery, false);
        }
      );
    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.addressService.fetchGridData(this.state, this.searchQuery, false);
        }
      );

    this.addressService.fetchGridData(this.state, this.searchQuery, false);
    this.addressService.getGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.addressService.fetchGridData(state, this.searchQuery, false);
  }

  getGridActionMenuState(): boolean[] {
    const actionMenuState: boolean[] = [];
    this.gridData.data.forEach(() => {
      actionMenuState.push(false);
    });
    return actionMenuState;
  }

  getGridActions(item: AddressGridModel): ActionButton[] {
    const actions: ActionButton[] = [
      {
        handle: () => {
          if (item.status) {
            this.addressService.disable(item.id)
              .subscribe(
                (response: ResponseModel<string>) => {
                  if (response.hasError) {
                    this.alertService.setErrorAlert(response.msg);
                    return;
                  }
                  this.notificationService.show(
                    UtilityRix.getSuccsessNotification('Address Deactivated'));
                  this.addressService.fetchGridData(this.state, this.searchQuery, false);

                }
              );
          }
          else {
            this.addressService.enable(item.id)
              .subscribe(
                (response: ResponseModel<string>) => {
                  if (response.hasError) {
                    this.alertService.setErrorAlert(response.msg);
                    return;
                  }
                  this.notificationService.show(
                    UtilityRix.getSuccsessNotification('Address Activated'));
                  this.addressService.fetchGridData(this.state, this.searchQuery, false);

                }
              );
          }
        },
        icon: '',
        label: item.status ? 'Disable' : 'Enable'
      }
    ];

    actions.push({
      handle: () => {
        this.router.navigate(['/addresses/address/' + item.id + '/edit']);
      },
      icon: '',
      label: 'Edit'
    });

    return actions;
  }

  ngOnDestroy(): void {
    this.ngOnDestroy
    this.pageSizeSubscription.unsubscribe();
    if (this.gridFilterSubscription) {
      this.gridFilterSubscription.unsubscribe();
    }
  }
}
