import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { guid } from '@progress/kendo-angular-common';
import { Observable, Subject } from 'rxjs';
import { UtilityRix } from '../../common/utility-rix';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';
import { PopupConfigModel } from '../../models/common/popup-config-model';
import { ResponseModel } from '../../models/common/response-model';
import { PassengerModel } from '../../models/passengers/passenger-model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  baseUrl = environment.apiUrl + 'passenger/';

  private showQuickAddPopup = new Subject<PopupConfigModel>();

  constructor(
    private http: HttpClient) { }

  // Form Groups
  createPassengerFormGroup(model: PassengerModel): UntypedFormGroup {
    return new UntypedFormGroup({
      id: new UntypedFormControl(model && model.id ? model.id : guid()),
      gender: new UntypedFormControl(
        model ? model.gender : null, [UtilityRix.dropdownRequired as ValidatorFn]),
      ageGroup: new UntypedFormControl(
        model ? model.ageGroup : null, [UtilityRix.dropdownRequired as ValidatorFn])
    });
  }

  getDropdownList(text: string): Observable<DropdownItem<string>[]> {
    return this.http.get<DropdownItem<string>[]>(
      this.baseUrl + 'get-dropdown-list?text=' + text);
  }

  get(id: string): Observable<PassengerModel> {
    return this.http.get<PassengerModel>(this.baseUrl + id);
  }

  addUpdate(model: PassengerModel): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl, model);
  }

  getQuickAddPopup(): Observable<PopupConfigModel> {
    return this.showQuickAddPopup.asObservable();
  }
  setQuickAddPopup(model: PopupConfigModel): void {
    this.showQuickAddPopup.next(model);
  }

}
