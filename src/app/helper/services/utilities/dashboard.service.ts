import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardDriverListModel } from '../../models/dashboard/dashboard-driver-list-model';
import { DashboardTripListModel } from '../../models/dashboard/dashboard-trip-list-model';
import { TripCountModel } from '../../models/dashboard/trip-count-model';
import { TripDetailCountModel } from '../../models/dashboard/trip-detail-count-model';
import { TripTypeChartModel } from '../../models/dashboard/trip-type-chart-model';
import { TripTypeMilageChartModel } from '../../models/dashboard/trip-type-milage-chart-model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.apiUrl + 'dashboard/';

  constructor(
    private http: HttpClient) { }

  getTripCountModel(): Observable<TripCountModel> {
    return this.http.get<TripCountModel>(
      this.baseUrl + 'get-trip-count-model');
  }

  getTripDetailCountModel(): Observable<TripDetailCountModel> {
    return this.http.get<TripDetailCountModel>(
      this.baseUrl + 'get-trip-detail-count-model');
  }
  getUpcomingTrips(): Observable<DashboardTripListModel[]> {
    return this.http.get<DashboardTripListModel[]>(
      this.baseUrl + 'get-upcoming-trip-list');
  }
  getOngoingTrips(): Observable<DashboardTripListModel[]> {
    return this.http.get<DashboardTripListModel[]>(
      this.baseUrl + 'get-ongoing-trip-list');
  }
  getActiveDrivers(): Observable<DashboardDriverListModel[]> {
    return this.http.get<DashboardDriverListModel[]>(
      this.baseUrl + 'get-active-driver-list');
  }
  getTripTypeChartListModel(): Observable<TripTypeChartModel[]> {
    return this.http.get<TripTypeChartModel[]>(
      this.baseUrl + 'get-trip-type-chart-list');
  }
  getTripTypeMilageChartListModel(): Observable<TripTypeMilageChartModel[]> {
    return this.http.get<TripTypeMilageChartModel[]>(
      this.baseUrl + 'get-trip-type-milage-chart-list');
  }
}

