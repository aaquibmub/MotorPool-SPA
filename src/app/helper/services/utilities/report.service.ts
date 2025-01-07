import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { AggregateDescriptor } from '@progress/kendo-data-query';
import { Observable, Subject } from 'rxjs';
import { OPM, TripType } from '../../common/shared-types';
import { GridList } from '../../models/common/grid/grid-list';
import { ReportAllDriverGridModel } from '../../models/reports/drivers/all-drivers/report-all-driver-grid-model';
import { ReportDriverDutyGridModel } from '../../models/reports/drivers/duties/report-driver-duty-grid-model';
import { ReportDriverIncidentGridModel } from '../../models/reports/drivers/incidents/report-driver-incident-grid-model';
import { ReportDriverMilageGridModel } from '../../models/reports/drivers/milages/report-driver-milage-grid-model';
import { ReportDriverTripGridModel } from '../../models/reports/drivers/trips/report-driver-trip-grid-model';
import { ReportAllPassengerGridModel } from '../../models/reports/passengers/all-passengers/report-all-passenger-grid-model';
import { ReportPassengerTripGridModel } from '../../models/reports/passengers/trips/report-passenger-trip-model';
import { ReportAllTripGridModel } from '../../models/reports/trips/all-trips/report-all-trip-grid-model';
import { ReportTripDriverSheetModel } from '../../models/reports/trips/driver-sheet/report-trip-driver-sheet-model';
import { ReportTripMilageGridModel } from '../../models/reports/trips/milages/report-trip-milage-grid-model';
import { ReportTripPassengerSheetModel } from '../../models/reports/trips/passenger-sheet/report-trip-passenger-sheet-model';
import { ReportTripSheetModel } from '../../models/reports/trips/trip-sheet/report-trip-sheet-model';
import { ReportTripTrackingModel } from '../../models/reports/trips/trip-tracking/report-trip-tracking-model';
import { ReportTripVehicleSheetModel } from '../../models/reports/trips/vehicle-sheet/report-trip-vehicle-sheet-model';
import { ReportAllGeneralInspectionGridModel } from '../../models/reports/vehicles/all-vehicles/report-all-general-inspection-grid-model';
import { ReportAllVehicleGridModel } from '../../models/reports/vehicles/all-vehicles/report-all-vehicle-grid-model';
import { ReportVehicleDueOilChangeGridModel } from '../../models/reports/vehicles/all-vehicles/report-vehicle-due-oil-change';
import { ReportVehicleMilageGridModel } from '../../models/reports/vehicles/all-vehicles/report-vehicle-milage-grid-model';
import { ReportVehicleGeneralInspectionByDateModel } from '../../models/reports/vehicles/inspections/general/report-vehicle-general-inspection-by-date-model';
import { ReportVehicleGeneralInspectionByVehicleModel } from '../../models/reports/vehicles/inspections/general/report-vehicle-general-inspection-by-vehicle-model';
import { ReportVehicleBodyInspectionGridModel } from '../../models/reports/vehicles/inspections/report-vehicle-body-inspection-grid-model';
import { ReportVehicleBodyInspectionModel } from '../../models/reports/vehicles/inspections/report-vehicle-body-inspection-model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl = environment.apiUrl + 'report/';

  // trips
  private allTripGridData = new Subject<GridList<ReportAllTripGridModel>>();
  private upcomingTripGridData = new Subject<GridList<ReportAllTripGridModel>>();
  private tripMilageGridData = new Subject<GridList<ReportTripMilageGridModel>>();
  // vehicles
  private allVehicleGridData = new Subject<GridList<ReportAllVehicleGridModel>>();
  private vehicleDueOilChangeGridData = new Subject<GridList<ReportVehicleDueOilChangeGridModel>>();
  private allGeneralInspectionGridData = new Subject<GridList<ReportAllGeneralInspectionGridModel>>();
  private vehicleMilageGridData = new Subject<GridList<ReportVehicleMilageGridModel>>();
  private vehicleBodyInspectionGridData = new Subject<GridList<ReportVehicleBodyInspectionGridModel>>();
  // drivers
  private allDriverGridData = new Subject<GridList<ReportAllDriverGridModel>>();
  private driverTripGridData = new Subject<GridList<ReportDriverTripGridModel>>();
  private driverMilageGridData = new Subject<GridList<ReportDriverMilageGridModel>>();
  private driverDutyGridData = new Subject<GridList<ReportDriverDutyGridModel>>();
  private driverIncidentGridData = new Subject<GridList<ReportDriverIncidentGridModel>>();
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

  getVehicleBodyInspectionModel(
    date: Date,
    vehicleId?: string,
  ): Observable<ReportVehicleBodyInspectionModel[]> {
    return this.http.post<ReportVehicleBodyInspectionModel[]>(
      this.baseUrl + 'get-report-vehicle-body-inspection-model', { vehicleId, date });
  }

  getVehicleGeneralInspectionByDateModel(
    fromDate: Date,
    toDate: Date,
    vehicleId: string,
  ): Observable<ReportVehicleGeneralInspectionByDateModel[]> {
    return this.http.post<ReportVehicleGeneralInspectionByDateModel[]>(
      this.baseUrl + 'get-report-vehicle-general-inspection-by-date-model', { vehicleId, fromDate, toDate });
  }

  getVehicleGeneralInspectionByVehicleModel(
    date: Date,
    vehicleIds: string[],
  ): Observable<ReportVehicleGeneralInspectionByVehicleModel[]> {
    return this.http.post<ReportVehicleGeneralInspectionByVehicleModel[]>(
      this.baseUrl + 'get-report-vehicle-general-inspection-by-vehicle-model', { vehicleIds, date });
  }

  getTripPassengerSheetModel(
    passengerId: string,
    fromDate: Date,
    toDate: Date,
  ): Observable<ReportTripPassengerSheetModel[]> {
    return this.http.post<ReportTripPassengerSheetModel[]>(
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

  getTripTrackingModel(
    fromDate: Date,
    toDate: Date,
    tripRoute?: number,
  ): Observable<ReportTripTrackingModel[]> {
    return this.http.post<ReportTripTrackingModel[]>(
      this.baseUrl + 'get-report-trip-tracking-model', { tripRoute, fromDate, toDate });
  }

  getTripTrackingExcel(
    fromDate: Date,
    toDate: Date,
    tripRoute?: number,
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}get-report-trip-tracking-excel`, {
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
    from: Date,
    to: Date,
    type?: TripType,
    opm?: OPM): void {
    this.http.post<GridList<ReportAllTripGridModel>>(
      this.baseUrl + 'get-all-trip-gridlist', {
      gridFilters: state,
      search,
      from,
      to,
      type,
      opm
    }).subscribe(
      (gridData: GridList<ReportAllTripGridModel>) => {
        this.allTripGridData.next(gridData);
      }
    );
  }


  getUpcomingTripGridData(): Observable<GridDataResult> {
    return this.upcomingTripGridData.asObservable();
  }

  fetchUpcomingTripGridData(
    state: any,
    search: string,
    opm?: OPM): void {
    this.http.post<GridList<ReportAllTripGridModel>>(
      this.baseUrl + 'get-upcoming-trip-gridlist', {
      gridFilters: state,
      search,
      opm
    }).subscribe(
      (gridData: GridList<ReportAllTripGridModel>) => {
        this.upcomingTripGridData.next(gridData);
      }
    );
  }

  getTripMilageGridData(): Observable<GridDataResult> {
    return this.tripMilageGridData.asObservable();
  }

  fetchTripMilageGridData(
    state: any,
    search: string,
    aggregate?: AggregateDescriptor[],
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

  getVehicleDueOilChangeGridData(): Observable<GridDataResult> {
    return this.vehicleDueOilChangeGridData.asObservable();
  }

  fetchVehicleDueOilChangeGridData(
    state: any,
    search: string): void {
    this.http.post<GridList<ReportVehicleDueOilChangeGridModel>>(
      this.baseUrl + 'get-vehical-due-oil-change-gridlist', {
      gridFilters: state,
      search
    }).subscribe(
      (gridData: GridList<ReportVehicleDueOilChangeGridModel>) => {
        this.vehicleDueOilChangeGridData.next(gridData);
      }
    );
  }

  getAllGeneralInspectionGridData(): Observable<GridDataResult> {
    return this.allGeneralInspectionGridData.asObservable();
  }

  fetchAllGeneralInspectionGridData(
    state: any,
    search: string): void {
    this.http.post<GridList<ReportAllGeneralInspectionGridModel>>(
      this.baseUrl + 'get-all-general-inspection-gridlist', {
      gridFilters: state,
      search
    }).subscribe(
      (gridData: GridList<ReportAllGeneralInspectionGridModel>) => {
        this.allGeneralInspectionGridData.next(gridData);
      }
    );
  }

  getVehicleMilageGridData(): Observable<GridDataResult> {
    return this.vehicleMilageGridData.asObservable();
  }

  fetchVehicleMilageGridData(
    state: any,
    search: string): void {
    this.http.post<GridList<ReportVehicleMilageGridModel>>(
      this.baseUrl + 'get-vehical-milage-gridlist', {
      gridFilters: state,
      search
    }).subscribe(
      (gridData: GridList<ReportVehicleMilageGridModel>) => {
        this.vehicleMilageGridData.next(gridData);
      }
    );
  }

  getVehicleBodyInspectionGridData(): Observable<GridDataResult> {
    return this.vehicleBodyInspectionGridData.asObservable();
  }

  fetchVehicleBodyInspectionGridData(
    state: any,
    search: string): void {
    this.http.post<GridList<ReportVehicleBodyInspectionGridModel>>(
      this.baseUrl + 'get-vehical-body-inspection-gridlist', {
      gridFilters: state,
      search
    }).subscribe(
      (gridData: GridList<ReportVehicleBodyInspectionGridModel>) => {
        this.vehicleBodyInspectionGridData.next(gridData);
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

  getDriverDutyGridData(): Observable<GridDataResult> {
    return this.driverDutyGridData.asObservable();
  }

  fetchDriverDutyGridData(
    state: any,
    search: string): void {
    this.http.post<GridList<ReportDriverDutyGridModel>>(
      this.baseUrl + 'get-driver-duty-gridlist', {
      gridFilters: state,
      search
    }).subscribe(
      (gridData: GridList<ReportDriverDutyGridModel>) => {
        this.driverDutyGridData.next(gridData);
      }
    );
  }

  getDriverIncidentGridData(): Observable<GridDataResult> {
    return this.driverIncidentGridData.asObservable();
  }

  fetchDriverIncidentGridData(
    state: any,
    search: string): void {
    this.http.post<GridList<ReportDriverIncidentGridModel>>(
      this.baseUrl + 'get-driver-incident-gridlist', {
      gridFilters: state,
      search
    }).subscribe(
      (gridData: GridList<ReportDriverIncidentGridModel>) => {
        this.driverIncidentGridData.next(gridData);
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
