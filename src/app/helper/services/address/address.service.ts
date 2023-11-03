import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable, Subject } from 'rxjs';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';
import { GridList } from '../../models/common/grid/grid-list';
import { environment } from './../../../../environments/environment';
import { AddressGridModel } from '../../models/address/address-grid-model';
import { AddressModel } from '../../models/address/address-model';
import { ResponseModel } from '../../models/common/response-model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  baseUrl = environment.apiUrl + 'address/';

  private gridData = new Subject<GridList<AddressGridModel>>();

  constructor(
    private http: HttpClient) { }

  getDropdownList(text: string): Observable<DropdownItem<string>[]> {
    return this.http.get<DropdownItem<string>[]>(
      this.baseUrl + 'get-dropdown-list?text=' + text);
  }

  getTableList(text: string): Observable<AddressModel[]> {
    return this.http.get<AddressModel[]>(
      this.baseUrl + 'get-table-list?text=' + text);
  }

  get(id: string): Observable<AddressModel> {
    return this.http.get<AddressModel>(this.baseUrl + id);
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
        this.http.post<GridList<AddressGridModel>>(
          this.baseUrl + 'get-address-gridlist', {
          gridFilters: state,
          search: query
        }).subscribe(
          (gridData: GridList<AddressGridModel>) => {
            this.gridData.next(gridData);
          }
        );
  }
}
