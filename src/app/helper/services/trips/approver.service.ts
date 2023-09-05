import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';

@Injectable({
  providedIn: 'root'
})
export class ApproverService {
  baseUrl = environment.apiUrl + 'approver/';

  constructor(
    private http: HttpClient) { }

  getDropdownList(text: string): Observable<DropdownItem<string>[]> {
    return this.http.get<DropdownItem<string>[]>(
      this.baseUrl + 'getdropdownlist?text=' + text);
  }
}
