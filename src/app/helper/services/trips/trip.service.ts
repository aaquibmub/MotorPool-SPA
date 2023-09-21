import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable, Subject } from 'rxjs';
import { GridList } from '../../models/common/grid/grid-list';
import { HttpClient } from '@angular/common/http';
import { TripGridModel } from '../../models/trips/enroute/trip-grid-model';
import { TripType } from '../../common/shared-types';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private gridData = new Subject<GridList<TripGridModel>>();
  baseUrl = environment.apiUrl + 'trip/';

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

}
