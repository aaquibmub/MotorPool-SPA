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
    NotificationsComponent
  ]
})
export class SettingModule { }
