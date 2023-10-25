import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DropdownType } from '../../common/shared-types';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl = environment.apiUrl + 'common/';

  constructor(
    private http: HttpClient) { }

  getDropdownList(dropDownType: DropdownType, text: string): Observable<DropdownItem<number>[]> {
    const url = this.baseUrl + 'get-dropdown-list?dropdown='
      + dropDownType + '&&text='
      + text;
    return this.http.get<DropdownItem<number>[]>(url);
  }

  getCountryDropdownList(text: string): Observable<DropdownItem<string>[]> {
    return this.http.get<DropdownItem<string>[]>(
      this.baseUrl + 'get-country-dropdown-list?text=' + text);
  }

}
