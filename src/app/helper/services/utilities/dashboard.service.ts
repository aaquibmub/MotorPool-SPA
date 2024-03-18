import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
  refreshDashboard = new Subject<boolean>();

  constructor(
    private http: HttpClient) { }

  setRefreshDashboard(flag: boolean): void {
    this.refreshDashboard.next(flag);
  }

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
  getTripTypeChartListModel(): Observable<TripTypeChartModel[]> {
    return this.http.get<TripTypeChartModel[]>(
      this.baseUrl + 'get-trip-type-chart-list');
  }
  getTripTypeMilageChartListModel(): Observable<TripTypeMilageChartModel[]> {
    return this.http.get<TripTypeMilageChartModel[]>(
      this.baseUrl + 'get-trip-type-milage-chart-list');
  }
}

