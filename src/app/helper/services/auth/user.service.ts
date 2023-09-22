import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserRoleType } from '../../common/shared-types';
import { Observable } from 'rxjs';
import { UserRoleModel } from '../../models/auth/user-role-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = environment.apiUrl + 'user/';

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  getUsersByRole(role: UserRoleType): Observable<UserRoleModel[]> {
    return this.http.get<UserRoleModel[]>(
      this.userUrl + 'getusersbyrole?role=' + role);
  }

}
