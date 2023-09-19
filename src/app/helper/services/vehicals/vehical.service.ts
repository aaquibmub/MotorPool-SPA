import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';

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
}
