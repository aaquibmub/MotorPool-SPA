import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { PopupConfigModel } from 'src/app/helper/models/common/popup-config-model';
import { UtilityRix } from './../../../../../helper/common/utility-rix';
import { GridToolbarService } from './../../../../../helper/services/common/grid-toolbar.service';
import { UtilityService } from './../../../../../helper/services/common/utility.service';
import { TripService } from './../../../../../helper/services/trips/trip.service';

@Component({
  selector: 'app-trip-edit-passenger-list',
  templateUrl: './trip-edit-passenger-list.component.html',
  styleUrls: ['./trip-edit-passenger-list.component.css']
})
export class TripEditPassengerListComponent implements OnInit {

  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;
  id: string;

  pageSizeSubscription: Subscription;
  gridFilterSubscription: Subscription;
  tripPassengerPopupSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private tripService: TripService,
    private route: ActivatedRoute,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit(): void {
    this.route.parent.params
      .subscribe((params: Params) => {
        if (params.id) {
          this.id = params.id;
        }
      });

    this.tripPassengerPopupSubscription = this.tripService.getTripPassengerPopup()
      .subscribe(
        (config: PopupConfigModel) => {
          if (!config.show) {
            this.tripService.fetchTripPassengerGridData(this.state, this.searchQuery, this.id);
          }
        }
      );

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
          this.tripService.fetchTripPassengerGridData(this.state, this.searchQuery, this.id);
        }
      );

    this.tripService.fetchTripPassengerGridData(this.state, this.searchQuery, this.id);
    this.tripService.getTripPassengerGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.tripService.fetchTripPassengerGridData(state, this.searchQuery, this.id);
  }

  handleCreateNewButtonClick(): void {
    this.tripService.setTripPassengerPopup({ show: true, arg: this.id, });
  }

  ngOnDestroy(): void {
    this.pageSizeSubscription.unsubscribe();
  }

}


