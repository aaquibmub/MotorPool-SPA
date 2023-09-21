import { GridList } from './../../../../../helper/models/common/grid/grid-list';
import { GridToolbarService } from './../../../../../helper/services/common/grid-toolbar.service';
import { TripService } from './../../../../../helper/services/trips/trip.service';
import { ActionButton } from './../../../../../helper/models/common/grid/action-button';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { Router } from '@angular/router';
import { TripGridModel } from 'src/app/helper/models/trips/enroute/trip-grid-model';

@Component({
  selector: 'app-trip-booking-all',
  templateUrl: './trip-booking-all.component.html',
  styleUrls: ['./trip-booking-all.component.css']
})
export class TripBookingAllComponent implements OnInit, OnDestroy {
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
