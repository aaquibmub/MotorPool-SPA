import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';
import { VehicalModel } from '../../models/vehicals/vehical-model';
import { GridList } from '../../models/common/grid/grid-list';
import { VehicalGridModel } from '../../models/vehicals/vehical-grid-model';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { ResponseModel } from '../../models/common/response-model';

@Injectable({
  providedIn: 'root'
})
export class VehicalService {
  baseUrl = environment.apiUrl + 'vehical/';

  private gridData = new Subject<GridList<VehicalGridModel>>();

  constructor(
    private http: HttpClient) { }

  getDropdownList(text: string): Observable<DropdownItem<string>[]> {
    return this.http.get<DropdownItem<string>[]>(
      this.baseUrl + 'get-dropdown-list?text=' + text);
  }

  getTableList(text: string): Observable<VehicalModel[]> {
    return this.http.get<VehicalModel[]>(
      this.baseUrl + 'get-table-list?text=' + text);
  }

  get(id: string): Observable<VehicalModel> {
    return this.http.get<VehicalModel>(this.baseUrl + id);
  }

  addUpdate(model: any): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl, model);
  }

  getGridData(): Observable<GridDataResult> {
    return this.gridData.asObservable();
  }
  fetchGridData(
    state: any,
    query: string,
    active?: boolean): void {
    this.http.post<GridList<VehicalGridModel>>(
      this.baseUrl + 'get-vehical-gridlist', {
      gridFilters: state,
      search: query,
      active
    }).subscribe(
      (gridData: GridList<VehicalGridModel>) => {
        this.gridData.next(gridData);
      }
    );
  }
}
