import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';
import { GridList } from '../../models/common/grid/grid-list';
import { PopupConfigModel } from '../../models/common/popup-config-model';
import { ResponseModel } from '../../models/common/response-model';
import { AllocateVehicalModel } from '../../models/drivers/allocate-vehical-model';
import { DriverGridModel } from '../../models/drivers/driver-grid-model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  baseUrl = environment.apiUrl + 'driver/';

  private gridData = new Subject<GridList<DriverGridModel>>();
  private showAllocateVehicalPopup = new Subject<PopupConfigModel>();
  private showDeallocateVehicalPopup = new Subject<PopupConfigModel>();

  constructor(
    private http: HttpClient) { }

  getDropdownList(text: string): Observable<DropdownItem<string>[]> {
    return this.http.get<DropdownItem<string>[]>(
      this.baseUrl + 'get-dropdown-list?text=' + text);
  }
  getDropdownListForTrip(text: string): Observable<DropdownItem<string>[]> {
    return this.http.get<DropdownItem<string>[]>(
      this.baseUrl + 'get-dropdown-list-for-trip?text=' + text);
  }

  getGridData(): Observable<GridDataResult> {
    return this.gridData.asObservable();
  }
  fetchGridData(
    state: any,
    query: string,
    active?: boolean): void {
    this.http.post<GridList<DriverGridModel>>(
      this.baseUrl + 'get-driver-gridlist', {
      gridFilters: state,
      search: query,
      active
    }).subscribe(
      (gridData: GridList<DriverGridModel>) => {
        this.gridData.next(gridData);
      }
    );
  }

  getAllocateVehicalPopup(): Observable<PopupConfigModel> {
    return this.showAllocateVehicalPopup.asObservable();
  }
  setAllocateVehicalPopup(show: boolean, arg?: any): void {
    this.showAllocateVehicalPopup.next({ show, arg });
  }

  getDeallocateVehicalPopup(): Observable<PopupConfigModel> {
    return this.showDeallocateVehicalPopup.asObservable();
  }
  setDeallocateVehicalPopup(show: boolean, arg?: any): void {
    this.showDeallocateVehicalPopup.next({ show, arg });
  }

  getAllocateVehicalModel(id: string): Observable<AllocateVehicalModel> {
    return this.http.get<AllocateVehicalModel>(
      this.baseUrl + 'get-allocate-vehical-model?id=' + id);
  }

  allocateVehical(model: AllocateVehicalModel): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl + 'allocate-vehical', model);
  }

  deallocateVehical(model: AllocateVehicalModel): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl + 'deallocate-vehical', model);
  }

  addUpdate(model: any): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl, model);
  }
  enable(id: string): Observable<ResponseModel<string>> {
    return this.http.delete<ResponseModel<string>>(this.baseUrl + 'enable/' + id);
  }
  disable(id: string): Observable<ResponseModel<string>> {
    return this.http.delete<ResponseModel<string>>(this.baseUrl + 'disable/' + id);
  }

}
