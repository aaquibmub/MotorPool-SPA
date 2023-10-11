import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';

@Injectable({
  providedIn: 'root'
})
export class VehicalTypeService {
  baseUrl = environment.apiUrl + 'vehicaltype/';

  constructor(
    private http: HttpClient) { }

  getDropdownList(text: string): Observable<DropdownItem<string>[]> {
    return this.http.get<DropdownItem<string>[]>(
      this.baseUrl + 'get-dropdown-list?text=' + text);
  }

}
