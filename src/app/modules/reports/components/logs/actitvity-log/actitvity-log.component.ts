import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { GridToolbarService } from 'src/app/helper/services/common/grid-toolbar.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { LogService } from 'src/app/helper/services/utilities/log.service';
import { ActionButton } from './../../../../../helper/models/common/grid/action-button';

@Component({
  selector: 'app-actitvity-log',
  templateUrl: './actitvity-log.component.html',
  styleUrls: ['./actitvity-log.component.css']
})
export class ActitvityLogComponent implements OnInit, OnDestroy {
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;

  getGridDataForActivityLogSub: Subscription;
  gridFilterSubscription: Subscription;
  refreshScreenSubscription: Subscription;

  constructor(
    private logService: LogService,
    public utilityService: UtilityService,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit() {

    this.refreshScreenSubscription = this.utilityService.refreshData.subscribe({
      next: (flag: boolean) => {
        if (flag) {
          this.logService.fetchGridDataForActivityLog(this.state, this.searchQuery);
        }
      },
      error: (err) => console.error(err)
    });

    this.gridFilterSubscription = this.gridToolbarService.getGridFilter()
      .subscribe(
        (show: boolean) => {
          this.filterable = show ? UtilityRix.gridConfig.filterable : '';
          this.state.filter = null;
          this.logService.fetchGridDataForActivityLog(this.state, this.searchQuery);
        }
      );

    this.logService.fetchGridDataForActivityLog(this.state, this.searchQuery);

    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.logService.fetchGridDataForActivityLog(this.state, this.searchQuery);
        }
      );

    this.getGridDataForActivityLogSub = this.logService.getGridDataForActivityLog()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );
  }
  cancel: ActionButton = {
    handle: () => {
    },
    icon: '',
    label: 'Cancel'
  }
  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.logService.fetchGridDataForActivityLog(this.state, this.searchQuery);
  }
  ngOnDestroy(): void {
    this.getGridDataForActivityLogSub.unsubscribe();
    if (this.refreshScreenSubscription) {
      this.refreshScreenSubscription.unsubscribe();
    }
  }

}
