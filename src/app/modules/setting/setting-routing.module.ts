import { NotificationsComponent } from './components/notifications/notifications.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SettingComponent } from './setting.component';
import { UserManagmentComponent } from './components/user-managment/user-managment.component';
import { UsersComponent } from './components/user-managment/users/users.component';
import { RolesComponent } from './components/user-managment/roles/roles.component';
import { UserComponent } from './components/user-managment/user/user.component';
import { UserEditComponent } from './components/user-managment/user/user-edit/user-edit.component';
import { RoleComponent } from './components/user-managment/role/role.component';
import { RoleEditComponent } from './components/user-managment/role/role-edit/role-edit.component';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    canActivate: [AuthGuard],
    children: [

      // Notifications
      {
        path: 'notifications',
        component: NotificationsComponent
      },

      // user management
      {
        path: 'user-management',
        component: UserManagmentComponent,
        children: [
          { path: '', redirectTo: 'users', pathMatch: 'full' },
          { path: 'users', component: UsersComponent },
          { path: 'roles', component: RolesComponent }
        ]
      },

      // user
      {
        path: 'user',
        component: UserComponent,
        children: [
          {
            path: '',
            redirectTo: '/setting/user-management',
            pathMatch: 'full'
          },
          { path: 'new', component: UserEditComponent },
          { path: ':id/edit', component: UserEditComponent },
        ]
      },

      // role
      {
        path: 'role',
        component: RoleComponent,
        children: [
          {
            path: '',
            redirectTo: '/setting/user-management',
            pathMatch: 'full'
          },
          { path: 'new', component: RoleEditComponent },
          { path: ':id/edit', component: RoleEditComponent },
        ]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
