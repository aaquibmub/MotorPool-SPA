import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { SharedModule } from './../../shared/shared.module';
import { TripBookingScheduledEditComponent } from './components/trip-booking/trip-booking-scheduled-edit/trip-booking-scheduled-edit.component';
import { TripBookingStartNowEditComponent } from './components/trip-booking/trip-booking-start-now-edit/trip-booking-start-now-edit.component';
import { TripBookingComponent } from './components/trip-booking/trip-booking.component';
import { TripBookingAllComponent } from './components/trip-bookings/trip-booking-all/trip-booking-all.component';
import { TripBookingScheduledListComponent } from './components/trip-bookings/trip-booking-scheduled-list/trip-booking-scheduled-list.component';
import { TripBookingStartNowListComponent } from './components/trip-bookings/trip-booking-start-now-list/trip-booking-start-now-list.component';
import { TripBookingsComponent } from './components/trip-bookings/trip-bookings.component';
import { TripViewDetailComponent } from './components/trip-view/trip-view-detail/trip-view-detail.component';
import { TripViewComponent } from './components/trip-view/trip-view.component';
import { TripRoutingModule } from './trip-routing.module';
import { TripComponent } from './trip.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    DropDownsModule,
    DateInputsModule,
    InputsModule,
    GridModule,
    ButtonsModule,
    TripRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [
    TripComponent,

    TripBookingComponent,

    TripBookingsComponent,
    TripBookingAllComponent,

    TripBookingScheduledEditComponent,
    TripBookingScheduledListComponent,

    TripBookingStartNowListComponent,
    TripBookingStartNowEditComponent,

    TripViewComponent,
    TripViewDetailComponent,
  ]
})
export class TripModule { }
