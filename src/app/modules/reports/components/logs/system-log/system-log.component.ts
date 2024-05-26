import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { SystemLogType } from 'src/app/helper/common/shared-types';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { ActionButton } from 'src/app/helper/models/common/grid/action-button';
import { GridToolbarService } from 'src/app/helper/services/common/grid-toolbar.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { LogService } from 'src/app/helper/services/utilities/log.service';

@Component({
  selector: 'app-system-log',
  templateUrl: './system-log.component.html',
  styleUrls: ['./system-log.component.css']
})
export class SystemLogComponent implements OnInit, OnDestroy {
  grid: GridComponent;
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;

  getGridDataForSystemLogSub: Subscription;
  gridFilterSubscription: Subscription;
  refreshScreenSubscription: Subscription;

  constructor(
    private logService: LogService,
    private gridToolbarService: GridToolbarService,
    public utilityService: UtilityService
  ) { }

  ngOnInit() {

    this.refreshScreenSubscription = this.utilityService.refreshData.subscribe({
      next: (flag: boolean) => {
        if (flag) {
          this.logService.fetchGridDataForSystemLog(this.state, this.searchQuery);
        }
      },
      error: (err) => console.error(err)
    });

    this.gridFilterSubscription = this.gridToolbarService.getGridFilter()
      .subscribe(
        (show: boolean) => {
          this.filterable = show ? UtilityRix.gridConfig.filterable : '';
          this.state.filter = null;
          this.logService.fetchGridDataForSystemLog(this.state, this.searchQuery);
        }
      );

    this.logService.fetchGridDataForSystemLog(this.state, this.searchQuery);

    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.state = UtilityRix.gridConfig.state;
          this.logService.fetchGridDataForSystemLog(this.state, this.searchQuery);
        }
      );
    this.getGridDataForSystemLogSub = this.logService.getGridDataForSystemLog()
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
    this.logService.fetchGridDataForSystemLog(this.state, this.searchQuery);
  }
  getSystemLogTypeFor(item: SystemLogType): string {
    return this.utilityService.getSystemLogTypeLabel(item);
  }
  ngOnDestroy(): void {
    this.getGridDataForSystemLogSub.unsubscribe();
    if (this.refreshScreenSubscription) {
      this.refreshScreenSubscription.unsubscribe();
    }
    if (this.gridFilterSubscription) {
      this.gridFilterSubscription.unsubscribe();
    }
  }
}
