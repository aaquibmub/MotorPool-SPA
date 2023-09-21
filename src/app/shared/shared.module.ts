import { DateFormatPipe } from './../helper/directives/date-format.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NumericFormatPipe } from '../helper/directives/numeric-format.pipe';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationTickerComponent } from './notification-ticker/notification-ticker.component';
import { AlertComponent } from './components/alert/alert.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridToolbarComponent } from './components/grid/grid-toolbar/grid-toolbar.component';

@NgModule({
  exports: [
    CommonModule,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NumericFormatPipe,
    GridToolbarComponent,
    DateFormatPipe,
    AlertComponent,
    NotificationTickerComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    DialogModule,
    PerfectScrollbarModule,
    TranslateModule.forChild()
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NumericFormatPipe,
    GridToolbarComponent,
    DateFormatPipe,
    AlertComponent,
    NotificationTickerComponent
  ],
  providers: [],
})
export class SharedModule { }
