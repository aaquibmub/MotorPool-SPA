import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserRoleType } from '../../common/shared-types';
import { Observable, Subject } from 'rxjs';
import { UserRoleModel } from '../../models/auth/user-role-model';
import { GridList } from '../../models/common/grid/grid-list';
import { UserGridModel } from '../../models/settings/user-management/users/user-grid-model';
import { RoleGridModel } from '../../models/settings/user-management/roles/role-grid-model';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { UserModel } from '../../models/settings/user-management/users/user-model';
import { RoleModel } from '../../models/settings/user-management/roles/role-model';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';
import { ResponseModel } from '../../models/common/response-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private gridDataUsers = new Subject<GridList<UserGridModel>>();
  private gridDataRoles = new Subject<GridList<RoleGridModel>>();
  userUrl = environment.apiUrl + 'user/';

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  getUsersByRole(role: UserRoleType): Observable<UserRoleModel[]> {
    return this.http.get<UserRoleModel[]>(
      this.userUrl + 'getusersbyrole?role=' + role);
  }

  getUser(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(this.userUrl + 'user/' + id);
  }

  getUsersGridData(): Observable<GridDataResult> {
    return this.gridDataUsers.asObservable();
  }

  fetchUsersGridData(state: any, query: string): void {
    this.http.post<GridList<UserGridModel>>(
      this.userUrl + 'get-user-gridlist', {
      gridFilters: state, search: query
    })
      .subscribe(
        (gridData: GridList<UserGridModel>) => {
          this.gridDataUsers.next(gridData);
        }
      );
  }

  addUpdateUser(model: any): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.userUrl + 'user', model);
  }

  getRoleDropdownList(text: string): Observable<DropdownItem<string>[]> {
    return this.http.get<DropdownItem<string>[]>(
      this.userUrl + 'get-role-dropdown-list?text=' + text);
  }

  getRole(id: string): Observable<RoleModel> {
    return this.http.get<RoleModel>(this.userUrl + 'role/' + id);
  }

  getRolesGridData(): Observable<GridDataResult> {
    return this.gridDataRoles.asObservable();
  }

  fetchRolesGridData(state: any, query: string): void {
    this.http.post<GridList<RoleGridModel>>(
      this.userUrl + 'get-role-gridlist', {
      gridFilters: state, search: query
    })
      .subscribe(
        (gridData: GridList<RoleGridModel>) => {
          this.gridDataRoles.next(gridData);
        }
      );
  }

  addUpdateRole(model: any): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.userUrl + 'role', model);
  }

}
