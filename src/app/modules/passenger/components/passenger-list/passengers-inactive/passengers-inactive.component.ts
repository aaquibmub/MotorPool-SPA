import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { flatten } from '@progress/kendo-angular-grid/dist/es2015/filtering/base-filter-cell.component';
import { NotificationService } from '@progress/kendo-angular-notification';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { Gender, GetGenderForDropdownList, GetOpmForDropdownList, OPM } from 'src/app/helper/common/shared-types';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ActionButton } from 'src/app/helper/models/common/grid/action-button';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { PassangerGridModel } from 'src/app/helper/models/passengers/passanger-grid-model';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { GridToolbarService } from 'src/app/helper/services/common/grid-toolbar.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { PassangerService } from 'src/app/helper/services/passanger/passanger.service';
import { AgeGroupService } from 'src/app/helper/services/utilities/age-group.service';

@Component({
  selector: 'app-passengers-inactive',
  templateUrl: './passengers-inactive.component.html',
  styleUrls: ['./passengers-inactive.component.css']
})
export class PassengersInactiveComponent implements OnInit {

  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;

  genderList: DropdownItem<Gender>[] = GetGenderForDropdownList();
  selectedGender: DropdownItem<Gender>;

  ageGroupList: DropdownItem<string>[] = [];
  selectedAgeGroup: DropdownItem<string>;

  opmList: DropdownItem<OPM>[] = GetOpmForDropdownList();
  selectedOpm: DropdownItem<OPM>;

  pageSizeSubscription: Subscription;
  gridFilterSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private passangerService: PassangerService,
    private ageGroupService: AgeGroupService,
    private alertService: AlertService,
    private notificationService: NotificationService,
    private router: Router,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit(): void {

    this.ageGroupService.getDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.ageGroupList = list;
      });

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
          this.passangerService.fetchGridData(this.state, this.searchQuery, false);
        }
      );
    this.gridToolbarService.getGridSearchQuery()
      .subscribe(
        (query: string) => {
          this.searchQuery = query;
          this.passangerService.fetchGridData(this.state, this.searchQuery, false);
        }
      );

    this.passangerService.fetchGridData(this.state, this.searchQuery, false);
    this.passangerService.getGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );
  }

  handleGenderValueChange(value: DropdownItem<Gender>): void {
    const root = { logic: 'and', filters: [], ...this.state.filter };
    const [filter] = flatten(root).filter(x => x.field === "gender");
    if (!filter) {
      root.filters.push({
        field: "gender",
        operator: "eq",
        value: value.value
      });
    } else {
      filter.value = value.value;
    }
    this.selectedGender = value;
    this.state.filter = root;
    this.dataStateChange(this.state as DataStateChangeEvent);
  }

  handleAgeGroupValueChange(value: DropdownItem<string>): void {
    const root = { logic: 'and', filters: [], ...this.state.filter };
    const [filter] = flatten(root).filter(x => x.field === "ageGroupId");
    if (!filter) {
      root.filters.push({
        field: "ageGroupId",
        operator: "eq",
        value: value.value
      });
    } else {
      filter.value = value.value;
    }
    this.selectedAgeGroup = value;
    this.state.filter = root;
    this.dataStateChange(this.state as DataStateChangeEvent);
  }

  handleOpmValueChange(value: DropdownItem<OPM>): void {
    const root = { logic: 'and', filters: [], ...this.state.filter };
    const [filter] = flatten(root).filter(x => x.field === "opm");
    if (!filter) {
      root.filters.push({
        field: "opm",
        operator: "eq",
        value: value.value
      });
    } else {
      filter.value = value.value;
    }
    this.selectedOpm = value;
    this.state.filter = root;
    this.dataStateChange(this.state as DataStateChangeEvent);
  }


  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.passangerService.fetchGridData(state, this.searchQuery, false);
  }

  getGridActionMenuState(): boolean[] {
    const actionMenuState: boolean[] = [];
    this.gridData.data.forEach(() => {
      actionMenuState.push(false);
    });
    return actionMenuState;
  }

  getGridActions(item: PassangerGridModel): ActionButton[] {
    const actions: ActionButton[] = [
      {
        handle: () => {
          if (item.active) {
            this.passangerService.disable(item.id)
              .subscribe(
                (response: ResponseModel<string>) => {
                  if (response.hasError) {
                    this.alertService.setErrorAlert(response.msg);
                    return;
                  }
                  this.notificationService.show(
                    UtilityRix.getSuccsessNotification('Passenger Deactivated'));
                  this.passangerService.fetchGridData(this.state, this.searchQuery, false);

                }
              );
          }
          else {
            this.passangerService.enable(item.id)
              .subscribe(
                (response: ResponseModel<string>) => {
                  if (response.hasError) {
                    this.alertService.setErrorAlert(response.msg);
                    return;
                  }
                  this.notificationService.show(
                    UtilityRix.getSuccsessNotification('Passenger Activated'));
                  this.passangerService.fetchGridData(this.state, this.searchQuery, false);

                }
              );
          }
        },
        icon: '',
        label: item.active ? 'Disable' : 'Enable'
      }
    ];

    actions.push({
      handle: () => {
        this.router.navigate(['/passengers/passenger/' + item.id + '/edit']);
      },
      icon: '',
      label: 'Edit'
    });

    return actions;
  }

  ngOnDestroy(): void {
    this.pageSizeSubscription.unsubscribe();
    if (this.gridFilterSubscription) {
      this.gridFilterSubscription.unsubscribe();
    }
  }
}

