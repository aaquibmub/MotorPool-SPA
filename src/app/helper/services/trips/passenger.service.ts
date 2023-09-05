import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';
import { HttpClient } from '@angular/common/http';
import { PassengerModel } from '../../models/passengers/passenger-model';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  baseUrl = environment.apiUrl + 'passenger/';

  constructor(
    private http: HttpClient) { }

  getDropdownList(text: string): Observable<DropdownItem<string>[]> {
    return this.http.get<DropdownItem<string>[]>(
      this.baseUrl + 'getdropdownlist?text=' + text);
  }

  get(id: string): Observable<PassengerModel> {
    return this.http.get<PassengerModel>(this.baseUrl + id);
  }

}
