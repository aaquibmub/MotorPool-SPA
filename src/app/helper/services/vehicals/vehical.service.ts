import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable, Subject } from 'rxjs';
import { VehicalStatus } from '../../common/shared-types';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';
import { GridList } from '../../models/common/grid/grid-list';
import { ResponseModel } from '../../models/common/response-model';
import { VehicalGridModel } from '../../models/vehicals/vehical-grid-model';
import { VehicalModel } from '../../models/vehicals/vehical-model';
import { environment } from './../../../../environments/environment';

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

  getTableList(
    text: string,
    allocated?: boolean): Observable<VehicalModel[]> {
    let url = this.baseUrl + 'get-table-list?text=' + text;
    if (allocated) {
      url += '&allocated=' + allocated;
    }
    return this.http.get<VehicalModel[]>(url);
  }

  get(id: string): Observable<VehicalModel> {
    return this.http.get<VehicalModel>(this.baseUrl + id);
  }

  getVehicalByDriverId(id: string): Observable<ResponseModel<VehicalModel>> {
    return this.http.get<ResponseModel<VehicalModel>>(this.baseUrl + 'get-vehical-by-driver-id/' + id);
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
    status?: VehicalStatus): void {
    this.http.post<GridList<VehicalGridModel>>(
      this.baseUrl + 'get-vehical-gridlist', {
      gridFilters: state,
      search: query,
      status
    }).subscribe(
      (gridData: GridList<VehicalGridModel>) => {
        this.gridData.next(gridData);
      }
    );
  }
}
