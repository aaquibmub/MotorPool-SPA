import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../../models/common/response-model';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { GridList } from '../../models/common/grid/grid-list';
import { NotificationConfigGridModel } from '../../models/settings/notification-config/notification-config-grid-model';
import { PopupConfigModel } from '../../models/common/popup-config-model';
import { NotificationConfigModel } from '../../models/settings/notification-config/notification-config-model';
import { NotificationFor } from '../../common/shared-types';
import { NotificationFeatureModel } from '../../models/settings/notification-config/notification-feature-model';

@Injectable({
  providedIn: 'root'
})
export class NotificationConfigService {
  private gridData = new Subject<GridList<NotificationConfigGridModel>>();
  baseUrl = environment.apiUrl + 'notification/';

  private showNotificationConfigQuickAddPopup = new Subject<PopupConfigModel>();
  private selectedNotificationConfigModel = new Subject<NotificationConfigModel>();

  constructor(
    private http: HttpClient) { }

  getNotificationConfigQuickAddPopup(): Observable<PopupConfigModel> {
    return this.showNotificationConfigQuickAddPopup.asObservable();
  }
  setNotificationConfigQuickAddPopup(flag: PopupConfigModel): void {
    this.showNotificationConfigQuickAddPopup.next(flag);
  }

  get(id: string): Observable<NotificationConfigModel> {
    return this.http.get<NotificationConfigModel>(this.baseUrl + id);
  }

  addUpdate(model: NotificationConfigModel): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl, model);
  }

  getSelectedNotificationConfigModel(): Observable<NotificationConfigModel> {
    return this.selectedNotificationConfigModel.asObservable();
  }
  setSelectedNotificationConfigModel(model: NotificationConfigModel): void {
    this.selectedNotificationConfigModel.next(model);
  }

  getGridData(): Observable<GridDataResult> {
    return this.gridData.asObservable();
  }

  fetchGridData(state: any, query: string): void {
    this.http.post<GridList<NotificationConfigGridModel>>(
      this.baseUrl + 'getnotificationgridlist', {
      gridFilters: state, search: query
    })
      .subscribe(
        (gridData: GridList<NotificationConfigGridModel>) => {
          this.gridData.next(gridData);
        }
      );
  }

  getFeaturesByCategory(category: NotificationFor):
    Observable<GridList<NotificationFeatureModel>> {
    return this.http.get<GridList<NotificationFeatureModel>>(
      this.baseUrl + 'getfeaturebycategory?category=' + category);
  }

}
