import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable, Subject } from 'rxjs';
import { GridList } from '../../models/common/grid/grid-list';
import { ReportTripDriverSheetModel } from '../../models/reports/trips/driver-sheet/report-trip-driver-sheet-model';
import { ReportTripPassengerSheetModel } from '../../models/reports/trips/passenger-sheet/report-trip-passenger-sheet-model';
import { ReportTripSheetModel } from '../../models/reports/trips/trip-sheet/report-trip-sheet-model';
import { ReportTripVehicleSheetModel } from '../../models/reports/trips/vehicle-sheet/report-trip-vehicle-sheet-model';
import { ReportAllVehicleGridModel } from '../../models/reports/vehicles/all-vehicles/report-all-vehicle-grid-model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl = environment.apiUrl + 'report/';

  private allVehicleGridData = new Subject<GridList<ReportAllVehicleGridModel>>();

  constructor(
    private http: HttpClient) { }

  getTripDriverSheetModel(
    date: Date,
    driverId?: string,
  ): Observable<ReportTripDriverSheetModel[]> {
    return this.http.post<ReportTripDriverSheetModel[]>(
      this.baseUrl + 'get-report-trip-driver-sheet-model', { driverId, date });
  }

  getTripDriverSheetExcel(
    date: Date,
    driverId?: string,
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}get-report-trip-driver-sheet-excel`, {
      driverId,
      date,
    }, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
    // return this.http.post<ReportTripDriverSheetModel>(
    //   this.baseUrl + 'get-report-trip-driver-sheet-model', { driverId, date });
  }

  getTripVehicleSheetModel(
    date: Date,
    vehicleId?: string,
  ): Observable<ReportTripVehicleSheetModel[]> {
    return this.http.post<ReportTripVehicleSheetModel[]>(
      this.baseUrl + 'get-report-trip-vehicle-sheet-model', { vehicleId, date });
  }

  getTripVehicleSheetExcel(
    date: Date,
    vehicleId?: string,
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}get-report-trip-vehicle-sheet-excel`, {
      vehicleId,
      date,
    }, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  getTripPassengerSheetModel(
    passengerId: string,
    fromDate: Date,
    toDate: Date,
  ): Observable<ReportTripPassengerSheetModel> {
    return this.http.post<ReportTripPassengerSheetModel>(
      this.baseUrl + 'get-report-trip-passenger-sheet-model', { passengerId, fromDate, toDate });
  }

  getTripPassengerSheetExcel(
    passengerId: string,
    fromDate: Date,
    toDate: Date,
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}get-report-trip-passenger-sheet-excel`, {
      passengerId,
      fromDate,
      toDate
    }, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  getTripSheetModel(
    fromDate: Date,
    toDate: Date,
    tripRoute?: number,
  ): Observable<ReportTripSheetModel[]> {
    return this.http.post<ReportTripSheetModel[]>(
      this.baseUrl + 'get-report-trip-sheet-model', { tripRoute, fromDate, toDate });
  }

  getTripSheetExcel(
    fromDate: Date,
    toDate: Date,
    tripRoute?: number,
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}get-report-trip-sheet-excel`, {
      fromDate,
      toDate,
      tripRoute,
    }, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  getAllVehicleGridData(): Observable<GridDataResult> {
    return this.allVehicleGridData.asObservable();
  }

  fetchAllVehicleGridData(
    state: any,
    query: string): void {
    this.http.post<GridList<ReportAllVehicleGridModel>>(
      this.baseUrl + 'get-all-vehical-gridlist', {
      gridFilters: state,
      search: query
    }).subscribe(
      (gridData: GridList<ReportAllVehicleGridModel>) => {
        this.allVehicleGridData.next(gridData);
      }
    );
  }

}
