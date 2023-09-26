import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './trip.component';
import { TripRoutingModule } from './trip-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TripBookingComponent } from './components/trip-booking/trip-booking.component';
import { TripBookingAllComponent } from './components/trip-bookings/trip-booking-all/trip-booking-all.component';
import { TripBookingScheduledListComponent } from './components/trip-bookings/trip-booking-scheduled-list/trip-booking-scheduled-list.component';
import { TripBookingScheduledEditComponent } from './components/trip-booking/trip-booking-scheduled-edit/trip-booking-scheduled-edit.component';
import { TripBookingStartNowListComponent } from './components/trip-bookings/trip-booking-start-now-list/trip-booking-start-now-list.component';
import { TripBookingsComponent } from './components/trip-bookings/trip-bookings.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TranslateModule } from '@ngx-translate/core';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { TripBookingStartNowEditComponent } from './components/trip-booking/trip-booking-start-now-edit/trip-booking-start-now-edit.component';

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
    TripBookingStartNowEditComponent
  ]
})
export class TripModule { }
