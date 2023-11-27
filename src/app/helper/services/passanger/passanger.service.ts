import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable, Subject } from 'rxjs';
import { VehicalStatus } from '../../common/shared-types';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';
import { GridList } from '../../models/common/grid/grid-list';
import { ResponseModel } from '../../models/common/response-model';
import { PassangerGridModel } from '../../models/passengers/passanger-grid-model';
import { PassengerModel } from '../../models/passengers/passenger-model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassangerService {
  baseUrl = environment.apiUrl + 'passanger/';

  private gridData = new Subject<GridList<PassangerGridModel>>();

  constructor(
    private http: HttpClient) { }

  get(id: string): Observable<PassengerModel> {
    return this.http.get<PassengerModel>(this.baseUrl + id);
  }

  getDropdownList(text: string): Observable<DropdownItem<string>[]> {
    return this.http.get<DropdownItem<string>[]>(
      this.baseUrl + 'get-dropdown-list?text=' + text);
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
    this.http.post<GridList<PassangerGridModel>>(
      this.baseUrl + 'get-gridlist', {
      gridFilters: state,
      search: query,
      status
    }).subscribe(
      (gridData: GridList<PassangerGridModel>) => {
        this.gridData.next(gridData);
      }
    );
  }
}
