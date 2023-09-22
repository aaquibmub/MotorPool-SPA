import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { SystemLogType } from 'src/app/helper/common/shared-types';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { ActionButton } from 'src/app/helper/models/common/grid/action-button';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { LogService } from 'src/app/helper/services/utilities/log.service';

@Component({
  selector: 'app-system-log',
  templateUrl: './system-log.component.html',
  styleUrls: ['./system-log.component.css']
})
export class SystemLogComponent implements OnInit, OnDestroy {
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  getGridDataForSystemLogSub: Subscription;
  constructor(
    private logService: LogService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.logService.fetchGridDataForSystemLog(this.state);
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
    this.logService.fetchGridDataForSystemLog(this.state);
  }
  getSystemLogTypeFor(item: SystemLogType): string {
    return this.utilityService.getSystemLogTypeLabel(item);
  }
  ngOnDestroy(): void {
    this.getGridDataForSystemLogSub.unsubscribe();
  }
}
