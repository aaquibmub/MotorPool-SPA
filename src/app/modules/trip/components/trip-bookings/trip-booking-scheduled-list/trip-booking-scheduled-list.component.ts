import { ActionButton } from './../../../../../helper/models/common/grid/action-button';
import { TripGridModel } from './../../../../../helper/models/trips/enroute/trip-grid-model';
import { GridToolbarService } from './../../../../../helper/services/common/grid-toolbar.service';
import { TripService } from './../../../../../helper/services/trips/trip.service';
import { UtilityRix } from './../../../../../helper/common/utility-rix';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TripType } from 'src/app/helper/common/shared-types';

@Component({
  selector: 'app-trip-booking-scheduled-list',
  templateUrl: './trip-booking-scheduled-list.component.html',
  styleUrls: ['./trip-booking-scheduled-list.component.css']
})
export class TripBookingScheduledListComponent implements OnInit, OnDestroy {
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  searchQuery: string;

  pageSizeSubscription: Subscription;

  constructor(
    private tripService: TripService,
    private router: Router,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit(): void {
    this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.tripService.fetchGridData(
            this.state, this.searchQuery, TripType.Scheduled);
        }
      );
    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.tripService.fetchGridData(this.state, this.searchQuery, TripType.Scheduled);
        }
      );

    this.tripService.fetchGridData(this.state, this.searchQuery, TripType.Scheduled);
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
      state, this.searchQuery, TripType.StartsNow);
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
        this.router.navigate(['/sales/sale-invoice/' + item.id + '/packing-list']);
      },
      icon: '',
      label: 'Packing List'
    });

    return actions;
  }

  ngOnDestroy(): void {
    this.pageSizeSubscription.unsubscribe();
  }
}
