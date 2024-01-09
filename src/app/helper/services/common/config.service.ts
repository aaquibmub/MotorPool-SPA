import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../../models/common/response-model';
import { DefaultValueConfigModel } from '../../models/settings/config/default-values/default-value-config-model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configUrl = environment.apiUrl + 'config/';

  constructor(
    private http: HttpClient) { }

  getDefaultValueConfigModel(): Observable<DefaultValueConfigModel> {
    return this.http.get<DefaultValueConfigModel>(
      this.configUrl + 'getdefaultvalueconfigmodel');
  }

  updateDefaultValueConfig(model: any): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(
      this.configUrl + 'updatedefaultvalueconfig', model);
  }

}

