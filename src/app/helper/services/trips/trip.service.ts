import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable, Subject } from 'rxjs';
import { TripType } from '../../common/shared-types';
import { GridList } from '../../models/common/grid/grid-list';
import { PopupConfigModel } from '../../models/common/popup-config-model';
import { ResponseModel } from '../../models/common/response-model';
import { TripExecuteModel } from '../../models/trips/enroute/trip-execute-model';
import { TripGridModel } from '../../models/trips/enroute/trip-grid-model';
import { TripStatusDetailModel } from '../../models/trips/enroute/trip-status-detail-model';
import { TripStatusModel } from '../../models/trips/enroute/trip-status-model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  baseUrl = environment.apiUrl + 'trip/';

  private gridData = new Subject<GridList<TripGridModel>>();
  private showTripExecutePopup = new Subject<PopupConfigModel>();
  private showTripCancelPopup = new Subject<PopupConfigModel>();

  constructor(
    private http: HttpClient) { }

  getGridData(): Observable<GridDataResult> {
    return this.gridData.asObservable();
  }

  fetchGridData(
    state: any,
    query: string,
    type?: TripType): void {
    this.http.post<GridList<TripGridModel>>(
      this.baseUrl + 'get-trip-gridlist', {
      gridFilters: state,
      search: query,
      type
    }).subscribe(
      (gridData: GridList<TripGridModel>) => {
        this.gridData.next(gridData);
      }
    );
  }

  getTripExecutePopup(): Observable<PopupConfigModel> {
    return this.showTripExecutePopup.asObservable();
  }
  setTripExecutePopup(show: boolean, arg?: any): void {
    this.showTripExecutePopup.next({ show, arg });
  }

  getTripExecuteModel(id: string): Observable<TripExecuteModel> {
    return this.http.get<TripExecuteModel>(
      this.baseUrl + 'get-trip-execute-model?id=' + id);
  }

  executeTrip(model: TripExecuteModel): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl + 'execute-trip', model);
  }

  getTripCancelPopup(): Observable<PopupConfigModel> {
    return this.showTripCancelPopup.asObservable();
  }
  setTripCancelPopup(show: boolean, arg?: any): void {
    this.showTripCancelPopup.next({ show, arg });
  }

  getTripStatusDetailModel(id: string): Observable<TripStatusDetailModel> {
    return this.http.get<TripStatusDetailModel>(
      this.baseUrl + 'get-trip-status-detail-model?id=' + id);
  }

  updateTripStatus(model: TripStatusModel): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl + 'update-trip-status', model);
  }

}
