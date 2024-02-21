import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfigurationsComponent } from './components/configurations/configurations.component';
import { DefaultValuesComponent } from './components/configurations/default-values/default-values.component';
import { AddressDataImportComponent } from './components/data-import/address-data-import/address-data-import.component';
import { DataImportLogGridListComponent } from './components/data-import/data-import-log-grid-list/data-import-log-grid-list.component';
import { DataImportComponent } from './components/data-import/data-import.component';
import { PassengerDataImportComponent } from './components/data-import/passenger-data-import/passenger-data-import.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { RoleEditComponent } from './components/user-managment/role/role-edit/role-edit.component';
import { RoleComponent } from './components/user-managment/role/role.component';
import { RolesComponent } from './components/user-managment/roles/roles.component';
import { UserManagmentComponent } from './components/user-managment/user-managment.component';
import { UserEditComponent } from './components/user-managment/user/user-edit/user-edit.component';
import { UserComponent } from './components/user-managment/user/user.component';
import { UsersComponent } from './components/user-managment/users/users.component';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';

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
    ReactiveFormsModule,
    LayoutModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    SettingComponent,

    ConfigurationsComponent,
    DefaultValuesComponent,

    NotificationsComponent,

    DataImportComponent,
    DataImportLogGridListComponent,
    PassengerDataImportComponent,
    AddressDataImportComponent,

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
