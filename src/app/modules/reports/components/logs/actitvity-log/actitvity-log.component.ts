import { ActionButton } from './../../../../../helper/models/common/grid/action-button';
import { ActivityLogModel } from 'src/app/helper/models/reports/log/activity-log-model';
import { GridList } from './../../../../../helper/models/common/grid/grid-list';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { LogService } from 'src/app/helper/services/utilities/log.service';

@Component({
  selector: 'app-actitvity-log',
  templateUrl: './actitvity-log.component.html',
  styleUrls: ['./actitvity-log.component.css']
})
export class ActitvityLogComponent implements OnInit, OnDestroy {
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;

  getGridDataForActivityLogSub: Subscription;

  constructor(
    private logService: LogService
  ) { }

  ngOnInit() {

    this.logService.fetchGridDataForActivityLog(this.state);

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
    this.logService.fetchGridDataForActivityLog(this.state);
  }
  ngOnDestroy(): void {
    this.getGridDataForActivityLogSub.unsubscribe();
  }

}
