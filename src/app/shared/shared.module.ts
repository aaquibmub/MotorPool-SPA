import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DateFormatPipe } from './../helper/directives/date-format.pipe';

import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NumericFormatPipe } from '../helper/directives/numeric-format.pipe';
import { TimeFormatPipe } from '../helper/directives/time-format.pipe';
import { AlertComponent } from './components/alert/alert.component';
import { GridActionDropdownComponent } from './components/grid/grid-action-dropdown/grid-action-dropdown.component';
import { GridToolbarComponent } from './components/grid/grid-toolbar/grid-toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationTickerComponent } from './notification-ticker/notification-ticker.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  exports: [
    CommonModule,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NumericFormatPipe,
    GridToolbarComponent,
    GridActionDropdownComponent,
    DateFormatPipe,
    TimeFormatPipe,
    AlertComponent,
    NotificationTickerComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    DialogModule,
    DropDownListModule,
    PerfectScrollbarModule,
    TranslateModule.forChild()
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NumericFormatPipe,
    GridToolbarComponent,
    GridActionDropdownComponent,
    DateFormatPipe,
    TimeFormatPipe,
    AlertComponent,
    NotificationTickerComponent
  ],
  providers: [],
})
export class SharedModule { }
