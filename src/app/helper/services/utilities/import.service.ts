import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable, Subject } from 'rxjs';
import { DataImportEntity } from '../../common/shared-types';
import { GridList } from '../../models/common/grid/grid-list';
import { DataImportLogListModel } from '../../models/settings/data-import/data-import-log-list-model';
import { ImportResponseModel } from '../../models/settings/data-import/import-response-model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  private gridData = new Subject<GridList<DataImportLogListModel>>();
  baseUrl = environment.apiUrl + 'import/';

  constructor(
    private http: HttpClient
  ) { }

  downloadPassengerTemplate(): Observable<any> {
    return this.http.get(`${this.baseUrl}download-passenger-template`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  importPassenger(model: any): Observable<ImportResponseModel> {
    return this.http.post<ImportResponseModel>(this.baseUrl + 'import-passenger', model);
  }

  downloadAddressTemplate(): Observable<any> {
    return this.http.get(`${this.baseUrl}download-address-template`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  importAddress(model: any): Observable<ImportResponseModel> {
    return this.http.post<ImportResponseModel>(this.baseUrl + 'import-address', model);
  }

  getGridData(): Observable<GridDataResult> {
    return this.gridData.asObservable();
  }

  fetchGridData(state: any, entity: DataImportEntity): void {
    this.http.post<GridList<DataImportLogListModel>>(
      this.baseUrl + 'get-data-import-log-grid-list', { gridFilters: state, entity: entity })
      .subscribe(
        (gridData: GridList<DataImportLogListModel>) => {
          this.gridData.next(gridData);
        }
      );
  }
}
