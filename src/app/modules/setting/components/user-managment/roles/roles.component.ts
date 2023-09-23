import { RoleGridModel } from './../../../../../helper/models/settings/user-management/roles/role-grid-model';
import { GridToolbarService } from './../../../../../helper/services/common/grid-toolbar.service';
import { UserService } from 'src/app/helper/services/auth/user.service';
import { ActionButton } from './../../../../../helper/models/common/grid/action-button';
import { UtilityRix } from './../../../../../helper/common/utility-rix';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit, OnDestroy {

  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  searchQuery: string;

  @ViewChild(GridComponent)
  public rolesGrid: GridComponent;

  pageSizeSubscription: Subscription;

  createButton: ActionButton = {
    handle: () => {
      this.router.navigate(['/setting/role/new']);
    },
    icon: '',
    label: 'New Role'
  };

  // roleType = RoleType;

  constructor(
    private userService: UserService,
    private router: Router,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit(): void {

    this.pageSizeSubscription = this.gridToolbarService.getPageSize()
      .subscribe(
        (pageSize: number) => {
          this.state.take = pageSize;
          this.userService.fetchRolesGridData(this.state, this.searchQuery);
        }
      );
    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.userService.fetchRolesGridData(this.state, this.searchQuery);
        }
      );

    this.userService.fetchRolesGridData(this.state, this.searchQuery);
    this.userService.getRolesGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.userService.fetchRolesGridData(state, this.searchQuery);
  }

  getGridActionMenuState(): boolean[] {
    const actionMenuState: boolean[] = [];
    this.gridData.data.forEach(() => {
      actionMenuState.push(false);
    });
    return actionMenuState;
  }

  getGridActions(item: RoleGridModel): ActionButton[] {
    const actions: ActionButton[] = [];

    actions.push({
      handle: () => {
        this.router.navigate(['/setting/role/' + item.roleID + '/edit']);
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
