import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { AggregateDescriptor } from '@progress/kendo-data-query';
import { Observable, Subject } from 'rxjs';
import { OPM, TripType } from '../../common/shared-types';
import { GridList } from '../../models/common/grid/grid-list';
import { ReportAllDriverGridModel } from '../../models/reports/drivers/all-drivers/report-all-driver-grid-model';
import { ReportDriverMilageGridModel } from '../../models/reports/drivers/milages/report-driver-milage-grid-model';
import { ReportDriverTripGridModel } from '../../models/reports/drivers/trips/report-driver-trip-grid-model';
import { ReportAllPassengerGridModel } from '../../models/reports/passengers/all-passengers/report-all-passenger-grid-model';
import { ReportPassengerTripGridModel } from '../../models/reports/passengers/trips/report-passenger-trip-model';
import { ReportAllTripGridModel } from '../../models/reports/trips/all-trips/report-all-trip-grid-model';
import { ReportTripDriverSheetModel } from '../../models/reports/trips/driver-sheet/report-trip-driver-sheet-model';
import { ReportTripMilageGridModel } from '../../models/reports/trips/milages/report-trip-milage-grid-model';
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

  // trips
  private allTripGridData = new Subject<GridList<ReportAllTripGridModel>>();
  private tripMilageGridData = new Subject<GridList<ReportTripMilageGridModel>>();
  // vehicles
  private allVehicleGridData = new Subject<GridList<ReportAllVehicleGridModel>>();
  // drivers
  private allDriverGridData = new Subject<GridList<ReportAllDriverGridModel>>();
  private driverTripGridData = new Subject<GridList<ReportDriverTripGridModel>>();
  private driverMilageGridData = new Subject<GridList<ReportDriverMilageGridModel>>();
  //passengers
  private allPassengerGridData = new Subject<GridList<ReportAllPassengerGridModel>>();
  private passengerTripGridData = new Subject<GridList<ReportPassengerTripGridModel>>();

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

  getAllTripGridData(): Observable<GridDataResult> {
    return this.allTripGridData.asObservable();
  }

  fetchAllTripGridData(
    state: any,
    search: string,
    type?: TripType,
    opm?: OPM): void {
    this.http.post<GridList<ReportAllTripGridModel>>(
      this.baseUrl + 'get-all-trip-gridlist', {
      gridFilters: state,
      search,
      type,
      opm
    }).subscribe(
      (gridData: GridList<ReportAllTripGridModel>) => {
        this.allTripGridData.next(gridData);
      }
    );
  }

  getTripMilageGridData(): Observable<GridDataResult> {
    return this.tripMilageGridData.asObservable();
  }

  fetchTripMilageGridData(
    state: any,
    search: string,
    aggregate: AggregateDescriptor[],
    type?: TripType,
    opm?: OPM): void {
    this.http.post<GridList<ReportTripMilageGridModel>>(
      this.baseUrl + 'get-trip-milage-gridlist', {
      gridFilters: { ...state, aggregate },
      search,
      type,
      opm
    }).subscribe(
      (gridData: GridList<ReportTripMilageGridModel>) => {
        this.tripMilageGridData.next(gridData);
      }
    );
  }

  getAllVehicleGridData(): Observable<GridDataResult> {
    return this.allVehicleGridData.asObservable();
  }

  fetchAllVehicleGridData(
    state: any,
    search: string): void {
    this.http.post<GridList<ReportAllVehicleGridModel>>(
      this.baseUrl + 'get-all-vehical-gridlist', {
      gridFilters: state,
      search
    }).subscribe(
      (gridData: GridList<ReportAllVehicleGridModel>) => {
        this.allVehicleGridData.next(gridData);
      }
    );
  }

  getAllDriverGridData(): Observable<GridDataResult> {
    return this.allDriverGridData.asObservable();
  }

  fetchAllDriverGridData(
    state: any,
    search: string): void {
    this.http.post<GridList<ReportAllDriverGridModel>>(
      this.baseUrl + 'get-all-driver-gridlist', {
      gridFilters: state,
      search
    }).subscribe(
      (gridData: GridList<ReportAllDriverGridModel>) => {
        this.allDriverGridData.next(gridData);
      }
    );
  }

  getDriverTripGridData(): Observable<GridDataResult> {
    return this.driverTripGridData.asObservable();
  }

  fetchDriverTripGridData(
    state: any,
    search: string): void {
    this.http.post<GridList<ReportDriverTripGridModel>>(
      this.baseUrl + 'get-driver-trip-gridlist', {
      gridFilters: state,
      search
    }).subscribe(
      (gridData: GridList<ReportDriverTripGridModel>) => {
        this.driverTripGridData.next(gridData);
      }
    );
  }

  getDriverMilageGridData(): Observable<GridDataResult> {
    return this.driverMilageGridData.asObservable();
  }

  fetchDriverMilageGridData(
    state: any,
    search: string,
    aggregate: AggregateDescriptor[]): void {
    this.http.post<GridList<ReportDriverMilageGridModel>>(
      this.baseUrl + 'get-driver-milage-gridlist', {
      gridFilters: { ...state, aggregate },
      search
    }).subscribe(
      (gridData: GridList<ReportDriverMilageGridModel>) => {
        this.driverMilageGridData.next(gridData);
      }
    );
  }

  getAllPassengerGridData(): Observable<GridDataResult> {
    return this.allPassengerGridData.asObservable();
  }

  fetchAllPassengerGridData(
    state: any,
    search: string): void {
    this.http.post<GridList<ReportAllPassengerGridModel>>(
      this.baseUrl + 'get-all-passenger-gridlist', {
      gridFilters: state,
      search
    }).subscribe(
      (gridData: GridList<ReportAllPassengerGridModel>) => {
        this.allPassengerGridData.next(gridData);
      }
    );
  }

  getPassengerTripGridData(): Observable<GridDataResult> {
    return this.passengerTripGridData.asObservable();
  }

  fetchPassengerTripGridData(
    state: any,
    search: string): void {
    this.http.post<GridList<ReportPassengerTripGridModel>>(
      this.baseUrl + 'get-passenger-trip-gridlist', {
      gridFilters: state,
      search
    }).subscribe(
      (gridData: GridList<ReportPassengerTripGridModel>) => {
        this.passengerTripGridData.next(gridData);
      }
    );
  }

}
