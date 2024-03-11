import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { TripStatus } from 'src/app/helper/common/shared-types';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { PopupConfigModel } from 'src/app/helper/models/common/popup-config-model';
import { TripGridModel } from 'src/app/helper/models/trips/enroute/trip-grid-model';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { ActionButton } from './../../../../../helper/models/common/grid/action-button';
import { GridToolbarService } from './../../../../../helper/services/common/grid-toolbar.service';
import { TripService } from './../../../../../helper/services/trips/trip.service';

@Component({
  selector: 'app-trip-booking-all',
  templateUrl: './trip-booking-all.component.html',
  styleUrls: ['./trip-booking-all.component.css']
})
export class TripBookingAllComponent implements OnInit, OnDestroy {
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;

  pageSizeSubscription: Subscription;
  tripExecutePopupSubscription: Subscription;
  tripCancelPopupSubscription: Subscription;
  gridFilterSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private tripService: TripService,
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
    this.tripExecutePopupSubscription = this.tripService.getTripExecutePopup()
      .subscribe(
        (config: PopupConfigModel) => {
          if (!config.show) {
            this.tripService.fetchGridData(this.state, this.searchQuery);
          }
        }
      );

    this.tripCancelPopupSubscription = this.tripService.getTripCancelPopup()
      .subscribe(
        (config: PopupConfigModel) => {
          if (!config.show) {
            this.tripService.fetchGridData(this.state, this.searchQuery);
          }
        }
      );

    this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.tripService.fetchGridData(this.state, this.searchQuery);
        }
      );
    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.tripService.fetchGridData(this.state, this.searchQuery);
        }
      );

    this.tripService.fetchGridData(this.state, this.searchQuery);
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
    this.tripService.fetchGridData(state, this.searchQuery);
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

    actions.push({
      handle: () => {
        this.router.navigate(['/trips/edit/' + item.id + '/journey']);
      },
      icon: '',
      label: 'Update'
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
  }
}
