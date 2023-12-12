import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { GridToolbarService } from 'src/app/helper/services/common/grid-toolbar.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { VehicalService } from 'src/app/helper/services/vehicals/vehical.service';

@Component({
  selector: 'app-vehical-view-drivers',
  templateUrl: './vehical-view-drivers.component.html',
  styleUrls: ['./vehical-view-drivers.component.scss']
})
export class VehicalViewDriversComponent implements OnInit {

  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;
  id: string;

  pageSizeSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private vehicalService: VehicalService,
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

      this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.vehicalService.fetchVehicalDriverGridData(this.state, this.searchQuery, this.id);
        }
      );

      this.vehicalService.fetchVehicalDriverGridData(this.state, this.searchQuery, this.id);
          this.vehicalService.getVehicalDriverGridData()
            .subscribe(
              (data: any) => {
                this.gridData.data = data.data;
                this.gridData.total = data.total;
              }
            );

    
  }

  dataStateChange(state: DataStateChangeEvent): void {
    debugger;
    this.state = state;
    this.vehicalService.fetchVehicalDriverGridData(state, this.searchQuery, this.id);
  }

  ngOnDestroy(): void {
    this.pageSizeSubscription.unsubscribe();
  }

}

