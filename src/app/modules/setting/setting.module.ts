import { UserManagmentComponent } from './components/user-managment/user-managment.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SettingRoutingModule } from './setting-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingComponent } from './setting.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { UsersComponent } from './components/user-managment/users/users.component';
import { RolesComponent } from './components/user-managment/roles/roles.component';
import { UserComponent } from './components/user-managment/user/user.component';
import { UserEditComponent } from './components/user-managment/user/user-edit/user-edit.component';
import { RoleComponent } from './components/user-managment/role/role.component';
import { RoleEditComponent } from './components/user-managment/role/role-edit/role-edit.component';

@NgModule({
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule,
    PerfectScrollbarModule,
    DropDownsModule,
    InputsModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SettingComponent,
    NotificationsComponent,

    UserManagmentComponent,
    UsersComponent,
    UserComponent,
    UserEditComponent,

    RolesComponent,
    RoleComponent,
    RoleEditComponent
  ]
})
export class SettingModule { }
