import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';
import { GridList } from '../../models/common/grid/grid-list';
import { PopupConfigModel } from '../../models/common/popup-config-model';
import { ResponseModel } from '../../models/common/response-model';
import { AllocateVehicalModel } from '../../models/drivers/allocate-vehical-model';
import { DriverGridModel } from '../../models/drivers/driver-grid-model';
import { DriverViewModel } from '../../models/drivers/driver-view/driver-view-model';
import { DriverViewDetailModel } from '../../models/drivers/driver-view/driver-view-detail-model';
import { DriverViewInspectionModel } from '../../models/drivers/driver-view/driver-view-inspection-model';
import { DriverViewTripModel } from '../../models/drivers/driver-view/driver-view-trip-model';
import { DriverViewVehicleModel } from '../../models/drivers/driver-view/driver-view-vehicle-model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  baseUrl = environment.apiUrl + 'driver/';

  private gridData = new Subject<GridList<DriverGridModel>>();
  private showAllocateVehicalPopup = new Subject<PopupConfigModel>();
  private showDeallocateVehicalPopup = new Subject<PopupConfigModel>();

  private gridInspectionData = new Subject<GridList<DriverViewInspectionModel>>();
  private gridTripData = new Subject<GridList<DriverViewTripModel>>();
  private gridVehicleData = new Subject<GridList<DriverViewVehicleModel>>();


  constructor(
    private http: HttpClient) { }

  getDropdownList(text: string): Observable<DropdownItem<string>[]> {
    return this.http.get<DropdownItem<string>[]>(
      this.baseUrl + 'get-dropdown-list?text=' + text);
  }
  getDropdownListForTrip(text: string): Observable<DropdownItem<string>[]> {
    return this.http.get<DropdownItem<string>[]>(
      this.baseUrl + 'get-dropdown-list-for-trip?text=' + text);
  }

  getGridData(): Observable<GridDataResult> {
    return this.gridData.asObservable();
  }
  fetchGridData(
    state: any,
    query: string,
    status?: boolean): void {
    this.http.post<GridList<DriverGridModel>>(
      this.baseUrl + 'get-driver-gridlist', {
      gridFilters: state,
      search: query,
      status
    }).subscribe(
      (gridData: GridList<DriverGridModel>) => {
        this.gridData.next(gridData);
      }
    );
  }

  getAllocateVehicalPopup(): Observable<PopupConfigModel> {
    return this.showAllocateVehicalPopup.asObservable();
  }
  setAllocateVehicalPopup(show: boolean, arg?: any): void {
    this.showAllocateVehicalPopup.next({ show, arg });
  }

  getDeallocateVehicalPopup(): Observable<PopupConfigModel> {
    return this.showDeallocateVehicalPopup.asObservable();
  }
  setDeallocateVehicalPopup(show: boolean, arg?: any): void {
    this.showDeallocateVehicalPopup.next({ show, arg });
  }

  getAllocateVehicalModel(id: string): Observable<AllocateVehicalModel> {
    return this.http.get<AllocateVehicalModel>(
      this.baseUrl + 'get-allocate-vehical-model?id=' + id);
  }

  allocateVehical(model: AllocateVehicalModel): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl + 'allocate-vehical', model);
  }

  deallocateVehical(model: AllocateVehicalModel): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl + 'deallocate-vehical', model);
  }

  addUpdate(model: any): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl, model);
  }
  enable(id: string): Observable<ResponseModel<string>> {
    return this.http.delete<ResponseModel<string>>(this.baseUrl + 'enable/' + id);
  }
  disable(id: string): Observable<ResponseModel<string>> {
    return this.http.delete<ResponseModel<string>>(this.baseUrl + 'disable/' + id);
  }

  getDriverViewModel(id: string): Observable<DriverViewModel> {
    return this.http.get<DriverViewModel>(this.baseUrl + 'get-view-model/' + id);
  }

  getDriverViewDetailModel(id: string): Observable<DriverViewDetailModel> {
    return this.http.get<DriverViewDetailModel>(this.baseUrl + 'get-view-detail-model/' + id);
  }

  // getDriverInspectionModel(id: string): Observable<DriverViewInspectionModel> {
  //   return this.http.get<DriverViewInspectionModel>(this.baseUrl + 'get-inspection-gridlist/' + id);
  // }

  getDriverInspectionGridData(): Observable<GridDataResult> {
    return this.gridInspectionData.asObservable();
  }

  fetchDriverInspectionGridData(
    state: any,
    query: string,
    driverId: string): void {
    this.http.post<GridList<DriverViewInspectionModel>>(
      this.baseUrl + 'get-inspection-gridlist', {
      gridFilters: state,
      search: query,
      driverId
    }).subscribe(
      (gridInspectionData: GridList<DriverViewInspectionModel>) => {
        this.gridInspectionData.next(gridInspectionData);
      }
    );
  }

  getDriverTripGridData(): Observable<GridDataResult> {
    return this.gridTripData.asObservable();
  }

  fetchDriverTripGridData(
    state: any,
    query: string,
    driverId: string): void {
    this.http.post<GridList<DriverViewTripModel>>(
      this.baseUrl + 'get-trip-gridlist', {
      gridFilters: state,
      search: query,
      driverId
    }).subscribe(
      (gridTripData: GridList<DriverViewTripModel>) => {
        this.gridTripData.next(gridTripData);
      }
    );
  }

  getDriverVehicleGridData(): Observable<GridDataResult> {
    return this.gridVehicleData.asObservable();
  }

  fetchDriverVehicleGridData(
    state: any,
    query: string,
    driverId: string): void {
    this.http.post<GridList<DriverViewVehicleModel>>(
      this.baseUrl + 'get-vehical-gridlist', {
      gridFilters: state,
      search: query,
      driverId
    }).subscribe(
      (gridVehicleData: GridList<DriverViewVehicleModel>) => {
        this.gridVehicleData.next(gridVehicleData);
      }
    );
  }


}
