import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { DropdownType } from '../../common/shared-types';
import { Observable } from 'rxjs';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';

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

}
