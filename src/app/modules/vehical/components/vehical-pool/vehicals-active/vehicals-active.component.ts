import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { VehicalStatus } from 'src/app/helper/common/shared-types';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { ActionButton } from 'src/app/helper/models/common/grid/action-button';
import { GridToolbarService } from 'src/app/helper/services/common/grid-toolbar.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { VehicalService } from 'src/app/helper/services/vehicals/vehical.service';
import { VehicalGridModel } from './../../../../../helper/models/vehicals/vehical-grid-model';

@Component({
  selector: 'app-vehicals-active',
  templateUrl: './vehicals-active.component.html',
  styleUrls: ['./vehicals-active.component.css']
})
export class VehicalsActiveComponent implements OnInit, OnDestroy {
  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;

  pageSizeSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private vehicalService: VehicalService,
    private router: Router,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit(): void {
    this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.vehicalService.fetchGridData(this.state, this.searchQuery, VehicalStatus.Active);
        }
      );
    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.vehicalService.fetchGridData(this.state, this.searchQuery, VehicalStatus.Active);
        }
      );

    this.vehicalService.fetchGridData(this.state, this.searchQuery, VehicalStatus.Active);
    this.vehicalService.getGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.vehicalService.fetchGridData(state, this.searchQuery, VehicalStatus.Active);
  }

  getGridActionMenuState(): boolean[] {
    const actionMenuState: boolean[] = [];
    this.gridData.data.forEach(() => {
      actionMenuState.push(false);
    });
    return actionMenuState;
  }

  getGridActions(item: VehicalGridModel): ActionButton[] {
    const actions: ActionButton[] = [];

    actions.push({
      handle: () => {
        this.router.navigate(['/vehicals/vehical/' + item.id + '/edit']);
      },
      icon: '',
      label: 'Edit'
    });

    return actions;
  }

  ngOnDestroy(): void {
    this.pageSizeSubscription.unsubscribe();
  }
}
