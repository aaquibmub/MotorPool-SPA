import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { ActionButton } from 'src/app/helper/models/common/grid/action-button';
import { TripBookingNoteGridModel } from 'src/app/helper/models/trips/trip-bookings/booking-note/trip-booking-note-grid-model';
import { GridToolbarService } from 'src/app/helper/services/common/grid-toolbar.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { TripBookingService } from 'src/app/helper/services/trips/trip-booking.service';

@Component({
  selector: 'app-booking-note-all',
  templateUrl: './booking-note-all.component.html',
  styleUrls: ['./booking-note-all.component.css']
})
export class BookingNoteAllComponent implements OnInit {

  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;

  pageSizeSubscription: Subscription;
  gridFilterSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private tripBookingService: TripBookingService,
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
          this.tripBookingService.fetchGridDataBookingNote(this.state, this.searchQuery);
        }
      );
    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.tripBookingService.fetchGridDataBookingNote(this.state, this.searchQuery);
        }
      );

    this.tripBookingService.fetchGridDataBookingNote(this.state, this.searchQuery);
    this.tripBookingService.getGridDataBookingNote()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.tripBookingService.fetchGridDataBookingNote(state, this.searchQuery);
  }

  getGridActionMenuState(): boolean[] {
    const actionMenuState: boolean[] = [];
    this.gridData.data.forEach(() => {
      actionMenuState.push(false);
    });
    return actionMenuState;
  }

  getGridActions(item: TripBookingNoteGridModel): ActionButton[] {
    const actions: ActionButton[] = [];

    actions.push({
      handle: () => {
        this.router.navigate(['/trips/booking-note/' + item.id + '/edit']);
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

