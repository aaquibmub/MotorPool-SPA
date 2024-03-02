import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable, Subject } from 'rxjs';
import { GridList } from '../../models/common/grid/grid-list';
import { ResponseModel } from '../../models/common/response-model';
import { IncidentCategoryGridModel } from '../../models/incidents/incident-category-grid-model';
import { IncidentCategoryModel } from '../../models/incidents/incident-category-model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  baseUrl = environment.apiUrl + 'incident/';

  private gridData = new Subject<GridList<IncidentCategoryGridModel>>();

  constructor(
    private http: HttpClient) { }

  getCategory(id: string): Observable<IncidentCategoryModel> {
    return this.http.get<IncidentCategoryModel>(this.baseUrl + 'get-category/' + id);
  }

  addUpdateCategory(model: any): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl + 'add-update-category', model);
  }

  getGridData(): Observable<GridDataResult> {
    return this.gridData.asObservable();
  }
  fetchGridData(
    state: any,
    query: string): void {
    this.http.post<GridList<IncidentCategoryGridModel>>(
      this.baseUrl + 'get-category-gridlist', {
      gridFilters: state,
      search: query
    }).subscribe(
      (gridData: GridList<IncidentCategoryGridModel>) => {
        this.gridData.next(gridData);
      }
    );
  }

}
