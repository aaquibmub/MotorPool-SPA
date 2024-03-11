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
import { TripHandoverModel } from '../../models/trips/enroute/trip-handover-model';
import { TripStatusDetailModel } from '../../models/trips/enroute/trip-status-detail-model';
import { TripStatusModel } from '../../models/trips/enroute/trip-status-model';
import { TripVehicleMeterModel } from '../../models/trips/enroute/trip-vehicle-meter-model';
import { TripJourneyModel } from '../../models/trips/trip-edit/trip-journey-model';
import { TripModel } from '../../models/trips/trip-edit/trip-model';
import { TripViewDetailModel } from '../../models/trips/trip-view/trip-view-detail-model';
import { TripViewLogModel } from '../../models/trips/trip-view/trip-view-log-model';
import { TripViewModel } from '../../models/trips/trip-view/trip-view-model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  baseUrl = environment.apiUrl + 'trip/';

  private gridData = new Subject<GridList<TripGridModel>>();
  private showTripExecutePopup = new Subject<PopupConfigModel>();
  private showTripHandoverPopup = new Subject<PopupConfigModel>();
  private showTripCancelPopup = new Subject<PopupConfigModel>();

  private gridLogData = new Subject<GridList<TripViewLogModel>>();

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

  getTripModel(id: string): Observable<TripModel> {
    return this.http.get<TripModel>(this.baseUrl + 'get-trip-model/' + id);
  }

  getTripJourneyModel(id: string): Observable<TripJourneyModel> {
    return this.http.get<TripJourneyModel>(this.baseUrl + 'get-trip-journey-model/' + id);
  }

  getTripViewModel(id: string): Observable<TripViewModel> {
    return this.http.get<TripViewModel>(this.baseUrl + 'get-trip-view-model/' + id);
  }

  getTripViewDetailModel(id: string): Observable<TripViewDetailModel> {
    return this.http.get<TripViewDetailModel>(this.baseUrl + 'get-trip-view-detail-model/' + id);
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

  getTripHandoverPopup(): Observable<PopupConfigModel> {
    return this.showTripHandoverPopup.asObservable();
  }
  setTripHandoverPopup(show: boolean, arg?: any): void {
    this.showTripHandoverPopup.next({ show, arg });
  }

  getTripHandoverModel(id: string): Observable<TripHandoverModel> {
    return this.http.get<TripHandoverModel>(
      this.baseUrl + 'get-trip-handover-model?id=' + id);
  }

  handoverTrip(model: TripHandoverModel): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl + 'handover-trip', model);
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

  updateTripVehicleMeter(model: TripVehicleMeterModel): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl + 'update-trip-vehical-meter', model);
  }

  getTripLogGridData(): Observable<GridDataResult> {
    return this.gridLogData.asObservable();
  }

  fetchTripLogGridData(
    state: any,
    query: string,
    tripId: string): void {
    this.http.post<GridList<TripViewLogModel>>(
      this.baseUrl + 'get-trip-log-gridlist', {
      gridFilters: state,
      search: query,
      tripId
    }).subscribe(
      (gridLogData: GridList<TripViewLogModel>) => {
        this.gridLogData.next(gridLogData);
      }
    );
  }

}
