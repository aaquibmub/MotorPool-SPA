import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { environment } from './../environments/environment';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { IntlModule } from '@progress/kendo-angular-intl';
import { LabelModule } from '@progress/kendo-angular-label';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptorProvider } from './helper/intercepters/error.interceptor';
import { HttpInterceptorService } from './helper/intercepters/http.interceptor';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { LoaderBlockUiComponent } from './shared/components/loader-block-ui/loader-block-ui.component';
import { PassengerQuickAddPopupComponent } from './shared/components/passengers/passenger-quick-add-popup/passenger-quick-add-popup.component';
import { NotificationRuleEditComponent } from './shared/components/settings/notifications/notification-rule-edit/notification-rule-edit.component';
import { AddressQuickAddPopupComponent } from './shared/popups/common/address-quick-add-popup/address-quick-add-popup.component';
import { AllocateVehicalPopupComponent } from './shared/popups/drivers/allocate-vehical-popup/allocate-vehical-popup.component';
import { DeallocateVehicalPopupComponent } from './shared/popups/drivers/deallocate-vehical-popup/deallocate-vehical-popup.component';
import { TripCancelPopupComponent } from './shared/popups/trips/trip-cancel-popup/trip-cancel-popup.component';
import { TripExecutePopupComponent } from './shared/popups/trips/trip-execute-popup/trip-execute-popup.component';
import { TripHandoverPopupComponent } from './shared/popups/trips/trip-handover-popup/trip-handover-popup.component';
import { SharedModule } from './shared/shared.module';

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
    AddressQuickAddPopupComponent,
    NotificationRuleEditComponent,

    TripExecutePopupComponent,
    TripHandoverPopupComponent,
    TripCancelPopupComponent,

    AllocateVehicalPopupComponent,
    DeallocateVehicalPopupComponent,
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
    LabelModule,
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
