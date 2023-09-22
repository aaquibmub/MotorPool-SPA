import { SqDeviceStatus } from './../../../../../../helper/common/shared_types';
import { GridList } from './../../../../../../helper/models/common/grid-list';
import { SqDeviceCodeGridModel } from './../../../../../../helper/models/config/integrations/sq-device-code-grid-model';
import { GridToolbarService } from './../../../../../../helper/services/common/grid-toolbar.service';
import { SquareIntegrationService } from './../../../../../../helper/services/config/square-integration.service';
import { ConstantsRix } from './../../../../../../helper/common/constants_rix';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-square-counter-list',
  templateUrl: './square-counter-list.component.html',
  styleUrls: ['./square-counter-list.component.css']
})
export class SquareCounterListComponent implements OnInit, OnDestroy {
  gridData: GridDataResult = ConstantsRix.gridConfig.gridData;
  state: State = ConstantsRix.gridConfig.state;
  pageable = ConstantsRix.gridConfig.pageable;
  searchQuery: string;

  pageSizeSubscription: Subscription;

  sqDeviceStatus = SqDeviceStatus;

  constructor(
    private squareIntegrationService: SquareIntegrationService,
    private router: Router,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit(): void {
    this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.squareIntegrationService.fetchGridData(this.state, this.searchQuery);
        }
      );
    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.squareIntegrationService.fetchGridData(this.state, this.searchQuery);
        }
      );

    this.squareIntegrationService.fetchGridData(this.state, this.searchQuery);
    this.squareIntegrationService.getGridData()
      .subscribe(
        (data: GridList<SqDeviceCodeGridModel>) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.squareIntegrationService.fetchGridData(state, this.searchQuery);
  }

  ngOnDestroy(): void {
    this.pageSizeSubscription.unsubscribe();
  }
}

