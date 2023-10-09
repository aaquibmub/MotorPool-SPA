import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';
import { VehicalModel } from '../../models/vehicals/vehical-model';

@Injectable({
  providedIn: 'root'
})
export class VehicalService {
  baseUrl = environment.apiUrl + 'vehical/';

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
}
