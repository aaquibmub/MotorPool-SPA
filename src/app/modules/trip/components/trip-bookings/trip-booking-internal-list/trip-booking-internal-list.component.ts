import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { TripStatus, TripType } from './../../../../../helper/common/shared-types';
import { UtilityRix } from './../../../../../helper/common/utility-rix';
import { ActionButton } from './../../../../../helper/models/common/grid/action-button';
import { PopupConfigModel } from './../../../../../helper/models/common/popup-config-model';
import { TripGridModel } from './../../../../../helper/models/trips/enroute/trip-grid-model';
import { GridToolbarService } from './../../../../../helper/services/common/grid-toolbar.service';
import { TripService } from './../../../../../helper/services/trips/trip.service';

@Component({
  selector: 'app-trip-booking-internal-list',
  templateUrl: './trip-booking-internal-list.component.html',
  styleUrls: ['./trip-booking-internal-list.component.css']
})
export class TripBookingInternalListComponent implements OnInit, OnDestroy {
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;

  pageSizeSubscription: Subscription;
  tripExecutePopupSubscription: Subscription;
  tripCancelPopupSubscription: Subscription;
  gridFilterSubscription: Subscription;
  refreshScreenSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private tripService: TripService,
    private router: Router,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit(): void {

    this.refreshScreenSubscription = this.utilityService.refreshData.subscribe({
      next: (flag: boolean) => {
        if (flag) {
          this.tripService.fetchGridData(this.state, this.searchQuery, TripType.Internal);
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
    this.tripExecutePopupSubscription = this.tripService.getTripExecutePopup()
      .subscribe(
        (config: PopupConfigModel) => {
          if (!config.show) {
            this.tripService.fetchGridData(this.state, this.searchQuery, TripType.Internal);
          }
        }
      );

    this.tripCancelPopupSubscription = this.tripService.getTripCancelPopup()
      .subscribe(
        (config: PopupConfigModel) => {
          if (!config.show) {
            this.tripService.fetchGridData(this.state, this.searchQuery, TripType.Internal);
          }
        }
      );
    this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.tripService.fetchGridData(
            this.state, this.searchQuery, TripType.Internal);
        }
      );
    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.tripService.fetchGridData(
            this.state, this.searchQuery, TripType.Internal);
        }
      );

    this.tripService.fetchGridData(
      this.state, this.searchQuery, TripType.Internal);
    this.tripService.getGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.tripService.fetchGridData(
      state, this.searchQuery, TripType.Internal);
  }

  getGridActionMenuState(): boolean[] {
    const actionMenuState: boolean[] = [];
    this.gridData.data.forEach(() => {
      actionMenuState.push(false);
    });
    return actionMenuState;
  }

  getGridActions(item: TripGridModel): ActionButton[] {
    const actions: ActionButton[] = [];

    actions.push({
      handle: () => {
        this.router.navigate(['/trips/view/' + item.id + '/detail']);
      },
      icon: '',
      label: 'View'
    });

    if (!item.onGoing && !item.cancelled) {
      if (item.status < TripStatus.AssignedToDriver) {
        actions.push({
          handle: () => {
            this.tripService.setTripExecutePopup(true, item.id);
          },
          icon: '',
          label: 'Execute'
        });
      }
    } else {
      if (!item.cancelled) {
        actions.push({
          handle: () => {
            this.tripService.setTripCancelPopup(true, item.id);
          },
          icon: '',
          label: 'Cancel'
        });
      }
    }

    return actions;
  }

  ngOnDestroy(): void {
    this.pageSizeSubscription.unsubscribe();
    if (this.tripExecutePopupSubscription) {
      this.tripExecutePopupSubscription.unsubscribe();
    }
    if (this.tripCancelPopupSubscription) {
      this.tripCancelPopupSubscription.unsubscribe();
    }
    if (this.gridFilterSubscription) {
      this.gridFilterSubscription.unsubscribe();
    }
    if (this.refreshScreenSubscription) {
      this.refreshScreenSubscription.unsubscribe();
    }
  }
}

