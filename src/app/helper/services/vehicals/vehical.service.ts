import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable, Subject } from 'rxjs';
import { VehicalInspectionStatus, VehicalStatus } from '../../common/shared-types';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';
import { GridList } from '../../models/common/grid/grid-list';
import { ResponseModel } from '../../models/common/response-model';
import { VehicalInspectionGridModel } from '../../models/vehicals/inspections/vehical-inspection-grid-model';
import { VehicalGridModel } from '../../models/vehicals/vehical-grid-model';
import { VehicalModel } from '../../models/vehicals/vehical-model';
import { VehicalViewDetailModel } from '../../models/vehicals/vehical-view-detail-model';
import { VehicalViewDriverModel } from '../../models/vehicals/vehical-view-driver-model';
import { VehicalViewInspectionModel } from '../../models/vehicals/vehical-view-inspection-model';
import { VehicalViewModel } from '../../models/vehicals/vehical-view-model';
import { VehicalViewTripModel } from '../../models/vehicals/vehical-view-trip-model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicalService {
  baseUrl = environment.apiUrl + 'vehical/';

  private gridData = new Subject<GridList<VehicalGridModel>>();
  private gridInspectionData = new Subject<GridList<VehicalViewInspectionModel>>();
  private gridTripData = new Subject<GridList<VehicalViewTripModel>>();
  private gridDriverData = new Subject<GridList<VehicalViewDriverModel>>();
  private gridVehicalInspectionData = new Subject<GridList<VehicalInspectionGridModel>>();

  constructor(
    private http: HttpClient) { }

  getDropdownList(text: string): Observable<DropdownItem<string>[]> {
    return this.http.get<DropdownItem<string>[]>(
      this.baseUrl + 'get-dropdown-list?text=' + text);
  }

  getTableList(
    text: string,
    driverId?: string,
    allocated?: boolean): Observable<VehicalModel[]> {
    let url = this.baseUrl + 'get-table-list?text=' + text;
    if (driverId) {
      url += '&driverId=' + driverId;
    }
    if (allocated == true
      || allocated == false) {
      url += '&allocated=' + allocated;
    }
    return this.http.get<VehicalModel[]>(url);
  }

  get(id: string): Observable<VehicalModel> {
    return this.http.get<VehicalModel>(this.baseUrl + id);
  }

  getVehicalByDriverId(id: string): Observable<ResponseModel<VehicalModel[]>> {
    return this.http.get<ResponseModel<VehicalModel[]>>(this.baseUrl + 'get-vehical-by-driver-id/' + id);
  }

  addUpdate(model: any): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl, model);
  }

  getGridData(): Observable<GridDataResult> {
    return this.gridData.asObservable();
  }
  fetchGridData(
    state: any,
    query: string,
    status?: VehicalStatus): void {
    this.http.post<GridList<VehicalGridModel>>(
      this.baseUrl + 'get-vehical-gridlist', {
      gridFilters: state,
      search: query,
      status
    }).subscribe(
      (gridData: GridList<VehicalGridModel>) => {
        this.gridData.next(gridData);
      }
    );
  }

  getVehicalViewModel(id: string): Observable<VehicalViewModel> {
    return this.http.get<VehicalViewModel>(this.baseUrl + 'get-view-model/' + id);
  }

  getVehicalViewDetailModel(id: string): Observable<VehicalViewDetailModel> {
    return this.http.get<VehicalViewDetailModel>(this.baseUrl + 'get-view-detail-model/' + id);
  }

  getVehicalInspectionByStatusGridData(): Observable<GridDataResult> {
    return this.gridVehicalInspectionData.asObservable();
  }
  fetchVehicalInspectionByStatusGridData(
    state: any,
    query: string,
    status?: VehicalInspectionStatus): void {
    this.http.post<GridList<VehicalInspectionGridModel>>(
      this.baseUrl + 'get-vehical-inspection-gridlist', {
      gridFilters: state,
      search: query,
      status
    }).subscribe(
      (gridData: GridList<VehicalInspectionGridModel>) => {
        this.gridVehicalInspectionData.next(gridData);
      }
    );
  }

  getVehicalInspectionGridData(): Observable<GridDataResult> {
    return this.gridInspectionData.asObservable();
  }

  fetchVehicalInspectionGridData(
    state: any,
    query: string,
    vehicalId: string): void {
    this.http.post<GridList<VehicalViewInspectionModel>>(
      this.baseUrl + 'get-inspection-gridlist', {
      gridFilters: state,
      search: query,
      vehicalId
    }).subscribe(
      (gridInspectionData: GridList<VehicalViewInspectionModel>) => {
        this.gridInspectionData.next(gridInspectionData);
      }
    );
  }

  getVehicalTripGridData(): Observable<GridDataResult> {
    return this.gridTripData.asObservable();
  }

  fetchVehicalTripGridData(
    state: any,
    query: string,
    vehicalId: string): void {
    this.http.post<GridList<VehicalViewTripModel>>(
      this.baseUrl + 'get-trip-gridlist', {
      gridFilters: state,
      search: query,
      vehicalId
    }).subscribe(
      (gridTripData: GridList<VehicalViewTripModel>) => {
        this.gridTripData.next(gridTripData);
      }
    );
  }

  getVehicalDriverGridData(): Observable<GridDataResult> {
    return this.gridDriverData.asObservable();
  }

  fetchVehicalDriverGridData(
    state: any,
    query: string,
    vehicalId: string): void {
    this.http.post<GridList<VehicalViewDriverModel>>(
      this.baseUrl + 'get-driver-gridlist', {
      gridFilters: state,
      search: query,
      vehicalId
    }).subscribe(
      (gridDriverData: GridList<VehicalViewDriverModel>) => {
        this.gridDriverData.next(gridDriverData);
      }
    );
  }
}
