import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GridList } from '../../models/common/grid/grid-list';
import { SystemLogModel } from '../../models/reports/log/system-log-model';
import { ActivityLogModel } from '../../models/reports/log/activity-log-model';
import { HttpClient } from '@angular/common/http';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Injectable({
  providedIn: 'root'
})

export class LogService {

  private gridDataForSystemLog = new Subject<GridList<SystemLogModel>>();
  private gridDataForActivityLog = new Subject<GridList<ActivityLogModel>>();
  baseUrl = environment.apiUrl + 'log/';

  constructor(private http: HttpClient) { }
  getGridDataForSystemLog(): Observable<GridDataResult> {
    return this.gridDataForSystemLog.asObservable();
  }
  fetchGridDataForSystemLog(state: any): void {
    this.http.post<GridList<SystemLogModel>>(
      this.baseUrl + 'get-system-log-list', { gridFilters: state })
      .subscribe(
        (gridData: GridList<SystemLogModel>) => {
          this.gridDataForSystemLog.next(gridData);
        }
      );
  }
  getGridDataForActivityLog(): Observable<GridDataResult> {
    return this.gridDataForActivityLog.asObservable();
  }
  fetchGridDataForActivityLog(state: any): void {
    this.http.post<GridList<ActivityLogModel>>(
      this.baseUrl + 'get-activity-log-list', { gridFilters: state })
      .subscribe(
        (gridData: GridList<ActivityLogModel>) => {
          this.gridDataForActivityLog.next(gridData);
        }
      );
  }

}

