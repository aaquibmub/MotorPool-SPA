import { InputsModule } from '@progress/kendo-angular-inputs';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';

import { AppComponent } from './app.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { SharedModule } from './shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import * as $ from 'jquery';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorInterceptorProvider } from './helper/intercepters/error.interceptor';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { IntlModule } from '@progress/kendo-angular-intl';
import { PassengerQuickAddPopupComponent } from './shared/components/passengers/passenger-quick-add-popup/passenger-quick-add-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LoaderBlockUiComponent } from './shared/components/loader-block-ui/loader-block-ui.component';
import { HttpInterceptorService } from './helper/intercepters/http.interceptor';
import { GridModule } from '@progress/kendo-angular-grid';
import { NotificationRuleEditComponent } from './shared/components/settings/notifications/notification-rule-edit/notification-rule-edit.component';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { TripExecutePopupComponent } from './shared/components/trips/trip-execute-popup/trip-execute-popup.component';
import { AllocateVehicalPopupComponent } from './shared/popups/drivers/allocate-vehical-popup/allocate-vehical-popup.component';


export function tokenGetter(): string {
  return localStorage.getItem('token');
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent,
    LoaderBlockUiComponent,

    PassengerQuickAddPopupComponent,
    NotificationRuleEditComponent,

    TripExecutePopupComponent,

    AllocateVehicalPopupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DropDownsModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [environment.baseDomain],
        disallowedRoutes: [environment.baseDomain + '/auth']
      }
    }),
    DialogsModule,
    GridModule,
    InputsModule,
    NotificationModule,
    IndicatorsModule,
    PerfectScrollbarModule,
    IntlModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en'
    })
  ],
  providers: [
    ErrorInterceptorProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
