import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportTripDriverSheetModel } from '../../models/reports/trips/driver-sheet/report-trip-driver-sheet-model';
import { ReportTripPassengerSheetModel } from '../../models/reports/trips/passenger-sheet/report-trip-passenger-sheet-model';
import { ReportTripVehicleSheetModel } from '../../models/reports/trips/vehicle-sheet/report-trip-vehicle-sheet-model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl = environment.apiUrl + 'report/';

  constructor(
    private http: HttpClient) { }

  getTripDriverSheetModel(
    driverId: string,
    date: Date,
  ): Observable<ReportTripDriverSheetModel> {
    return this.http.post<ReportTripDriverSheetModel>(
      this.baseUrl + 'get-report-trip-driver-sheet-model', { driverId, date });
  }

  getTripDriverSheetExcel(
    driverId: string,
    date: Date,
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
    vehicleId: string,
    date: Date,
  ): Observable<ReportTripVehicleSheetModel> {
    return this.http.post<ReportTripVehicleSheetModel>(
      this.baseUrl + 'get-report-trip-vehicle-sheet-model', { vehicleId, date });
  }

  getTripVehicleSheetExcel(
    vehicleId: string,
    date: Date,
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

}
