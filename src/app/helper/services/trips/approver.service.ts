import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';
import { ApproverModel } from '../../models/approver/approver-model';
import { ResponseModel } from '../../models/common/response-model';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { ApproverGridModel } from '../../models/approver/approver-grid-model';
import { GridList } from '../../models/common/grid/grid-list';

@Injectable({
  providedIn: 'root'
})
export class ApproverService {
  baseUrl = environment.apiUrl + 'approver/';

  private gridData = new Subject<GridList<ApproverGridModel>>();

  constructor(
    private http: HttpClient) { }

  getDropdownList(text: string): Observable<DropdownItem<string>[]> {
    return this.http.get<DropdownItem<string>[]>(
      this.baseUrl + 'get-dropdown-list?text=' + text);
  }

  getTableList(text: string): Observable<ApproverModel[]> {
    return this.http.get<ApproverModel[]>(
      this.baseUrl + 'get-table-list?text=' + text);
  }

  get(id: string): Observable<ApproverModel> {
    return this.http.get<ApproverModel>(this.baseUrl + id);
  }

  addUpdate(model: any): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl, model);
  }

  getGridData(): Observable<GridDataResult> {
    return this.gridData.asObservable();
  }
  fetchGridData(
    state: any,
    query: string): void {
        this.http.post<GridList<ApproverGridModel>>(
          this.baseUrl + 'get-address-gridlist', {
          gridFilters: state,
          search: query
        }).subscribe(
          (gridData: GridList<ApproverGridModel>) => {
            this.gridData.next(gridData);
          }
        );
  }
}
