import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';
import { HttpClient } from '@angular/common/http';
import { PassengerModel } from '../../models/passengers/passenger-model';
import { ResponseModel } from '../../models/common/response-model';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { guid } from '@progress/kendo-angular-common';
import { UtilityRix } from '../../common/utility-rix';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  baseUrl = environment.apiUrl + 'passenger/';

  private showQuickAddPopup = new Subject<boolean>();
  private selectedModel = new Subject<PassengerModel>();

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

  addUpdate(model: PassengerModel): Observable<ResponseModel<PassengerModel>> {
    return this.http.post<ResponseModel<PassengerModel>>(this.baseUrl, model);
  }

  getSelectedModel(): Observable<PassengerModel> {
    return this.selectedModel.asObservable();
  }
  setSelectedModel(model: PassengerModel): void {
    this.selectedModel.next(model);
  }


  getQuickAddPopup(): Observable<boolean> {
    return this.showQuickAddPopup.asObservable();
  }
  setQuickAddPopup(flag: boolean): void {
    this.showQuickAddPopup.next(flag);
  }

}
