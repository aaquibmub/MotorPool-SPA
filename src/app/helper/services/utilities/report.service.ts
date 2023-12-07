import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportTripDriverSheetModel } from '../../models/reports/trips/driver-sheet/report-trip-driver-sheet-model';
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

}
