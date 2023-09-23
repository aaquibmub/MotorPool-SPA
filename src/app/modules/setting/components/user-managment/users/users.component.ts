import { UserGridModel } from './../../../../../helper/models/settings/user-management/users/user-grid-model';
import { GridToolbarService } from './../../../../../helper/services/common/grid-toolbar.service';
import { UserService } from './../../../../../helper/services/auth/user.service';
import { ActionButton } from './../../../../../helper/models/common/grid/action-button';
import { UtilityRix } from './../../../../../helper/common/utility-rix';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataStateChangeEvent, GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  searchQuery: string;

  @ViewChild(GridComponent)
  public usersGrid: GridComponent;

  pageSizeSubscription: Subscription;

  createButton: ActionButton = {
    handle: () => {
      this.router.navigate(['/setting/user/new']);
    },
    icon: '',
    label: 'New User'
  };

  // userType = UserType;

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
          this.userService.fetchUsersGridData(this.state, this.searchQuery);
        }
      );
    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.userService.fetchUsersGridData(this.state, this.searchQuery);
        }
      );

    this.userService.fetchUsersGridData(this.state, this.searchQuery);
    this.userService.getUsersGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.userService.fetchUsersGridData(state, this.searchQuery);
  }

  getGridActionMenuState(): boolean[] {
    const actionMenuState: boolean[] = [];
    this.gridData.data.forEach(() => {
      actionMenuState.push(false);
    });
    return actionMenuState;
  }

  getGridActions(item: UserGridModel): ActionButton[] {
    const actions: ActionButton[] = [];

    actions.push({
      handle: () => {
        this.router.navigate(['/setting/user/' + item.userID + '/edit']);
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
