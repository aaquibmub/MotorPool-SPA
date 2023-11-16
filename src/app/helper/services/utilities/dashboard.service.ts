import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TripCountModel } from '../../models/dashboard/trip-count-model';
import { TripDetailCountModel } from '../../models/dashboard/trip-detail-count-model';
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
}

