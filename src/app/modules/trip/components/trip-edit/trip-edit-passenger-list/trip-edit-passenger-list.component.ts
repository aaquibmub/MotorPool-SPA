import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { PopupConfigModel } from 'src/app/helper/models/common/popup-config-model';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { PassengerModel } from 'src/app/helper/models/passengers/passenger-model';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { PassengerService } from 'src/app/helper/services/trips/passenger.service';
import { UtilityRix } from './../../../../../helper/common/utility-rix';
import { GridToolbarService } from './../../../../../helper/services/common/grid-toolbar.service';
import { UtilityService } from './../../../../../helper/services/common/utility.service';
import { TripService } from './../../../../../helper/services/trips/trip.service';

@Component({
  selector: 'app-trip-edit-passenger-list',
  templateUrl: './trip-edit-passenger-list.component.html',
  styleUrls: ['./trip-edit-passenger-list.component.css']
})
export class TripEditPassengerListComponent implements OnInit {

  gridData: GridDataResult = UtilityRix.gridConfig.gridData;
  state: State = UtilityRix.gridConfig.state;
  pageable = UtilityRix.gridConfig.pageable;
  filterable = UtilityRix.gridConfig.filterable;
  searchQuery: string;
  id: string;

  passengerList: DropdownItem<string>[];
  selectedPassenger: DropdownItem<string>;
  requesterDetail: PassengerModel;

  pageSizeSubscription: Subscription;
  gridFilterSubscription: Subscription;
  tripPassengerPopupSubscription: Subscription;

  constructor(
    public utilityService: UtilityService,
    private passengerService: PassengerService,
    private tripService: TripService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private dialogService: DialogService,
    private gridToolbarService: GridToolbarService
  ) { }

  ngOnInit(): void {
    this.route.parent.params
      .subscribe((params: Params) => {
        if (params.id) {
          this.id = params.id;
        }
      });

    this.passengerService.getDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.passengerList = list;
      });

    this.passengerService.getQuickAddPopup().subscribe(
      (pcm: PopupConfigModel) => {
        if (pcm && !pcm.show) {
          this.selectedPassenger = { value: pcm.passenger.id, text: pcm.passenger.name };
          this.handlePassengerValueChange(this.selectedPassenger);
        }
      }
    );

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
          this.tripService.fetchTripPassengerGridData(this.state, this.searchQuery, this.id);
        }
      );

    this.tripService.fetchTripPassengerGridData(this.state, this.searchQuery, this.id);
    this.tripService.getTripPassengerGridData()
      .subscribe(
        (data: any) => {
          this.gridData.data = data.data;
          this.gridData.total = data.total;
        }
      );
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.tripService.fetchTripPassengerGridData(state, this.searchQuery, this.id);
  }

  handlePassengerFilter(text: string): void {
    this.passengerService.getDropdownList(text)
      .subscribe((list: DropdownItem<string>[]) => {
        this.passengerList = list;
      });
  }

  handlePassengerValueChange(value: DropdownItem<string>): void {
    if (value == null || value.value === '') {
      this.resetPassengerValue();
      return;
    }
    this.passengerService.get(value.value)
      .subscribe((requester: PassengerModel) => {
        this.requesterDetail = requester;
      });
  }

  resetPassengerValue(): void {
    this.selectedPassenger = null;
    this.requesterDetail = null;
  }

  openPassengerQuickAddPopup(flag: boolean): void {
    this.passengerService.setQuickAddPopup({ show: true });
  }

  handleCreateNewButtonClick(): void {
    this.addNewPassenger();
  }

  addNewPassenger(): void {
    if (this.selectedPassenger == null || this.selectedPassenger.value === '') {
      this.alertService.setErrorAlert('Please select a passenger');
      return;
    }
    this.tripService.addPassenger({
      tripId: this.id,
      passengerName: this.selectedPassenger.text,
      opm: this.requesterDetail.opm
    })
      .subscribe((response: ResponseModel<string>) => {
        if (response.hasError) {
          this.alertService.setErrorAlert(response.msg);
          return;
        }
        this.resetPassengerValue();
        this.tripService.fetchTripPassengerGridData(this.state, this.searchQuery, this.id);
      });
  }

  removePassenger(id: string): void {
    const primaryAction = 'Remove';
    const successAction = 'Removed';
    const primaryMsg = 'Do you want to remove passenger?';

    const dialog: DialogRef = this.dialogService
      .open(this.alertService.getConfirmDialougeConfig(
        'Confirm ' + primaryAction, primaryMsg, primaryAction));

    dialog.result.subscribe((result: any) => {
      if (result.text === primaryAction) {
        this.tripService.removePassenger(id)
          .subscribe(
            (response: ResponseModel<string>) => {
              if (response.hasError) {
                this.alertService.setErrorAlert(response.msg);
                return;
              }

              this.alertService.setSuccessAlert(
                'Trip Passenger is '
                + successAction
                + ' successfully');

              this.tripService.fetchTripPassengerGridData(this.state, this.searchQuery, this.id);

            }
          );
      }
    });
  }

  ngOnDestroy(): void {
    this.pageSizeSubscription.unsubscribe();
  }

}


